import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { Booking } from './entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Worker } from 'worker_threads';

@Injectable()
export class BookingService {
    constructor(
      @InjectRepository(Booking)
      private bookingRepository: Repository<Booking>,
	  @Inject(CACHE_MANAGER)
	  private cacheManager: Cache
	) {}

	async createBooking(booking: CreateBookingDto) {
		const newBooking = await this.bookingRepository.create(booking)
		await this.bookingRepository.save(newBooking)
		return newBooking
	}

	getAllBookings() {
		return this.bookingRepository.find()
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
				finalPrice: await this.calculateFinalPrice(booking.id)
			}
		}
		throw new HttpException('Exception found in BookingService: getBookingById', HttpStatus.BAD_REQUEST)
	}

	async updateBooking(id: number, booking: UpdateBookingDto) {
		await this.cacheManager.reset()
		await this.bookingRepository.update(id, booking)
		this.getBookingById(id)
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
