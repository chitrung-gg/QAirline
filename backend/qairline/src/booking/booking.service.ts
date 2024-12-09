import { HttpException, HttpStatus, Inject, Injectable, Req, Request } from '@nestjs/common';
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
import RequestWithUser from 'src/authentication/interface/requestWithUser.interface';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { EmailService } from 'src/email/email.service';

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
	  private userService: UserService,
	  private emailService: EmailService,
	  @Inject(CACHE_MANAGER)
	  private cacheManager: Cache
	) {}

	generateBookingCode(airlineCode: string, flightId: number): string {
		const todayDate = new Date().toISOString().slice(2, 10).replace(/-/g, '');

		// Generate a simple random 4-character alphanumeric passenger ID
		const passengerId = Math.random().toString(36).substring(2, 6).toUpperCase();
	
		// Combine all elements to form the ticket code
		return `${airlineCode}${flightId}-${todayDate}-${passengerId}`;
	}

	async createBooking(booking: CreateBookingDto, user: any) {
		await this.cacheManager.reset()
		const flight = await this.flightRepository.findOne({
			where: {
				id: booking.flight.id
			}
		})

		const newBooking = await this.bookingRepository.create(booking)
		newBooking.bookingCode = this.generateBookingCode(flight.aircraft.aircraftCode, flight.id)
		
		if (flight) {
			newBooking.ticketPrice = flight.baseClassPrice
		} else {
			throw new HttpException('Exception found in BookingService: createBooking', HttpStatus.BAD_REQUEST)
		}

		if (user) {
			newBooking.user = await this.userService.getUserById(user.id)
		}


		await this.bookingRepository.save(newBooking)

		/* Uncomment for send email */
		// this.emailService.sendEmail({
		// 	recipient: booking.passengerEmail,
		// 	subject: 'QAirline - Booking Information',
		// 	content: `<!DOCTYPE html>
		// 			<html lang="en">
		// 			<head>
		// 				<meta charset="UTF-8">
		// 				<meta name="viewport" content="width=device-width, initial-scale=1.0">
		// 				<title>Flight Booking Confirmation</title>
		// 				<style>
		// 					body {
		// 						font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		// 						background-color: #f4f7fb;
		// 						margin: 0;
		// 						padding: 0;
		// 						color: #333;
		// 					}

		// 					.email-wrapper {
		// 						width: 100%;
		// 						max-width: 650px;
		// 						margin: 40px auto;
		// 						padding: 25px;
		// 						background-color: #fff;
		// 						border-radius: 10px;
		// 						box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		// 					}

		// 					h2 {
		// 						font-size: 28px;
		// 						font-weight: 600;
		// 						color: #0d47a1;
		// 						margin-bottom: 15px;
		// 					}

		// 					p {
		// 						font-size: 16px;
		// 						line-height: 1.6;
		// 						margin-bottom: 20px;
		// 						color: #555;
		// 					}

		// 					table {
		// 						width: 100%;
		// 						border-collapse: collapse;
		// 						margin-bottom: 20px;
		// 					}

		// 					td, th {
		// 						padding: 15px;
		// 						text-align: left;
		// 						font-size: 16px;
		// 						border-bottom: 1px solid #e0e0e0;
		// 					}

		// 					th {
		// 						background-color: #f7f7f7;
		// 						font-weight: 500;
		// 						color: #777;
		// 					}

		// 					td {
		// 						background-color: #fafafa;
		// 						color: #555;
		// 					}

		// 					td.highlight {
		// 						font-weight: 600;
		// 						color: #1a73e8;
		// 					}

		// 					.cta-button {
		// 						display: inline-block;
		// 						padding: 12px 24px;
		// 						font-size: 16px;
		// 						font-weight: 500;
		// 						background-color: #1a73e8;
		// 						color: #fff;
		// 						text-decoration: none;
		// 						border-radius: 5px;
		// 						margin-top: 20px;
		// 						transition: background-color 0.3s ease;
		// 					}

		// 					.cta-button:hover {
		// 						background-color: #1565c0;
		// 					}

		// 					.footer {
		// 						text-align: center;
		// 						font-size: 14px;
		// 						color: #777;
		// 						margin-top: 30px;
		// 					}

		// 					.footer a {
		// 						color: #1a73e8;
		// 						text-decoration: none;
		// 					}

		// 					.footer p {
		// 						margin-top: 10px;
		// 						color: #999;
		// 					}

		// 					.separator {
		// 						margin-top: 25px;
		// 						border-top: 2px solid #f0f0f0;
		// 						margin-bottom: 20px;
		// 					}

		// 				</style>
		// 			</head>
		// 			<body>

		// 				<div class="email-wrapper">

		// 					<h2>Hello ${newBooking.passengerName},</h2>

		// 					<p>Thank you for booking your flight with QAirline! Below are the details of your booking:</p>

		// 					<table>
		// 						<tr>
		// 							<th>Passenger Name</th>
		// 							<td>${newBooking.passengerName}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Email</th>
		// 							<td>${newBooking.passengerEmail}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Date of Birth</th>
		// 							<td>${newBooking.passengerDob}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Booking Code</th>
		// 							<td>${newBooking.bookingCode}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Passport Number</th>
		// 							<td>${newBooking.passportNumber}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Seat Number</th>
		// 							<td>${newBooking.seatNumber}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Seat Class</th>
		// 							<td>${newBooking.seatClass}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Booking Date</th>
		// 							<td>${newBooking.bookingDate}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Booking Status</th>
		// 							<td class="highlight">${newBooking.bookingStatus}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Flight Number</th>
		// 							<td>${flight.flightNumber}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Departure Time</th>
		// 							<td>${flight.departureTime}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Arrival Time (estimated)</th>
		// 							<td>${flight.arrivalTime}</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Departure Airport (City)</th>
		// 							<td>${flight.departureAirport.name} (${flight.departureAirport.city})</td>
		// 						</tr>
		// 						<tr>
		// 							<th>Arrival Airport (City)</th>
		// 							<td>${flight.arrivalAirport.name} (${flight.arrivalAirport.city})</td>
		// 						</tr>
		// 					</table>

		// 					<div class="separator"></div>

		// 					<p>If you have any questions or need assistance, feel free to contact our customer support team.</p>
							
		// 					<a href="mailto:support@qairline.com" class="cta-button">Contact Support</a>

		// 					<div class="footer">
		// 						<p>Best regards,<br>QAirline Team</p>
		// 						<p><a href="mailto:support@qairline.com">support@qairline.com</a></p>
		// 					</div>

		// 				</div>

		// 			</body>
		// 			</html>`
		// })
		
		return newBooking
	}

	async addUserToBooking(bookingId: number, userId: number) {
		await this.cacheManager.reset()
		const booking = await this.getBookingById(bookingId)
		if (booking.user) {
			throw new HttpException('User already in this booking', HttpStatus.FORBIDDEN)
		}
		const user = await this.userService.getUserById(userId);
		booking.user = user
		await this.bookingRepository.save(booking)
		return booking
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
