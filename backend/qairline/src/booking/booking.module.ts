import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entity/booking.entity';
import { Flight } from 'src/flight/entity/flight.entity';
import { Promotion } from 'src/promotion/entity/promotion.entity';
import { Payment } from 'src/payment/entity/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Flight, Promotion, Payment])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
