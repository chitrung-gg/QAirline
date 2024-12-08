import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { Booking } from './entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Worker } from 'worker_threads';
import { Flight } from 'src/flight/entity/flight.entity';
import { Promotion } from 'src/promotion/entity/promotion.entity';
import { Payment } from 'src/payment/entity/payment.entity';

@Injectable()
export class BookingService {
    constructor(
      @InjectRepository(Booking)
      private bookingRepository: Repository<Booking>,
	  @InjectRepository(Flight)
	  private flightRepository: Repository<Flight>,
	  @InjectRepository(Promotion)
	  private promotionRepository: Repository<Promotion>,
	  @InjectRepository(Payment)
	  private paymentRepository: Repository<Payment>,
	  @Inject(CACHE_MANAGER)
	  private cacheManager: Cache
	) {}

	async createBooking(booking: CreateBookingDto) {
		await this.cacheManager.reset()
		const flight = this.flightRepository.findOne({
			where: {
				id: booking.flight.id
			}
		})

		const newBooking = await this.bookingRepository.create(booking)
		
		if (flight) {
			newBooking.ticketPrice = (await flight).baseClassPrice
		} else {
			throw new HttpException('Exception found in BookingService: createBooking', HttpStatus.BAD_REQUEST)
		}
		await this.bookingRepository.save(newBooking)
		return newBooking
	}

	getAllBookings() {
		return this.bookingRepository.find()
	}

	async getBookingByBookingCode(bookingCode: string) {
		const booking = await this.bookingRepository.findOne({
			where: {
				bookingCode: bookingCode
			},
		});
		if (!booking) {
			throw new HttpException('Exception found in BookingService: getBookingByBookingCode', HttpStatus.BAD_REQUEST)
		}

		// let query = this.bookingRepository
        //     .createQueryBuilder('booking')
        //     .where('booking.flightId = :flightId', {
        //         flightId: booking.flight.id,
        //     })
        //     .andWhere('booking.promotionId = :promotionId', {
        //         promotionId: booking.promotion.id,
        //     })
		// 	.leftJoinAndSelect('booking.payments', 'payment')
		
		let query = this.bookingRepository
			.createQueryBuilder('booking')
			.leftJoinAndSelect('booking.flight', 'flight')  // Join and select the flight entity
			.leftJoinAndSelect('booking.promotion', 'promotion')  // Join and select the promotion entity
			.leftJoinAndSelect('booking.payments', 'payment')  // Join and select the payments
			.where('booking.bookingCode = :bookingCode', { bookingCode });  // Use the booking code for the where clause
		const bookingResult = await query.getMany()
		return bookingResult
	}

	async getBookingById(id: number) {
		// TODO: may change to find with string for real case purposes
		const booking = await this.bookingRepository.findOne({
			where: {
				id: id
			}
		});
		if (booking) {
			return {
				...booking,
				// finalPrice: await this.calculateFinalPrice(booking.id)
			}
		}
		throw new HttpException('Exception found in BookingService: getBookingById', HttpStatus.BAD_REQUEST)
	}
	
	async updateBooking(id: number, booking: UpdateBookingDto) {
		await this.cacheManager.reset()
		try {
			await this.getBookingById(id)
			await this.bookingRepository.update(id, booking)
		} catch (error) {
			throw new HttpException('Exception found in BookingService: updateBooking', HttpStatus.BAD_REQUEST)
		}
	}
	
	async cancelBooking(bookingCode: string) {
		const booking = await this.bookingRepository.findOne({
			where: {
				bookingCode: bookingCode
			},
		});
		if (!booking) {
			throw new HttpException('Exception found in BookingService: cancelBooking', HttpStatus.BAD_REQUEST)
		}

		booking.bookingStatus = "Cancelled"
		await this.bookingRepository.save(booking)
		const payments = await this.paymentRepository.find({
			where: {
				booking: { id: booking.id }
			}
		})


		// console.log(payments)
		await Promise.all(payments.map(async (payment) => {
			payment.paymentStatus = "Pending";

			// TODO: Cases when refund
			payment.refundAmount = payment.amount * 0.1

			const refundDate = new Date(payment.refundDate);
			refundDate.setDate(refundDate.getDate() + 7);
			payment.refundDate = refundDate.toISOString();
			
			await this.paymentRepository.save(payment);
		}));

		return this.getBookingByBookingCode(booking.bookingCode)
	}
	async deleteBooking(id: number) {
		await this.cacheManager.reset()
		const deleteResponse = await this.bookingRepository.delete(id)
		if (!deleteResponse.affected) {
			throw new HttpException('Exception found in BookingService: deleteBooking', HttpStatus.NOT_FOUND);
		}
	}

	async calculateFinalPrice(bookingId: number): Promise<any> {
		// Fetch the booking by ID
		const booking = await this.bookingRepository.findOne({
		  where: { id: bookingId },
		  relations: ['promotion'],
		});
	
		if (!booking) {
		  throw new Error('Booking not found');
		}
	
		// Fetch the promotion (if any)
		const promotion = booking.promotion;
	
		// Use worker thread to calculate the final price
		return new Promise((resolve, reject) => {
		  const worker = new Worker(__dirname + '/worker/booking.worker.js');
	
		  worker.postMessage({
			ticketPrice: booking.ticketPrice,
			promotion: promotion,
		  });
	
		  worker.on('message', (finalPrice) => {
			resolve(finalPrice);
		  });
	
		  worker.on('error', (error) => {
			reject(error);
		  });
	
		  worker.on('exit', (code) => {
			if (code !== 0) {
			  reject(new Error(`Worker stopped with exit code ${code}`));
			}
		  });
		});
	}
}
