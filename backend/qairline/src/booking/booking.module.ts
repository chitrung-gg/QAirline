import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entity/booking.entity';
import { Flight } from 'src/flight/entity/flight.entity';
import { Promotion } from 'src/promotion/entity/promotion.entity';
import { Payment } from 'src/payment/entity/payment.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entity/user.entity';
import { EmailModule } from 'src/email/email.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Flight, Promotion, Payment, User]), UserModule, EmailModule, AuthenticationModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
