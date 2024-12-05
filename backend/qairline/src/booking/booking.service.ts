import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { Booking } from './entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

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
			return booking;
		}
		throw new HttpException('Exception found in BookingService: getBookingById', HttpStatus.BAD_REQUEST)
	}

	async updateBooking(id: number, booking: UpdateBookingDto) {
		await this.bookingRepository.update(id, booking)
		this.getBookingById(id)
	}

	async deleteBooking(id: number) {
		const deleteResponse = await this.bookingRepository.delete(id)
		if (!deleteResponse.affected) {
			throw new HttpException('Exception found in BookingService: deleteBooking', HttpStatus.NOT_FOUND);
		}
	}
}
