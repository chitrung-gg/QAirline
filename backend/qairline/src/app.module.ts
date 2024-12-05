import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FlightController } from './flight/flight.controller';
import { FlightService } from './flight/flight.service';
import { Flight } from './flight/entity/flight.entity';
import { FlightModule } from './flight/flight.module';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { AirportModule } from './airport/airport.module';
import { BookingModule } from './booking/booking.module';
import { JwtModule } from '@nestjs/jwt';
import { ReportModule } from './report/report.module';

import { PromotionModule } from './promotion/promotion.module';

import { NewsModule } from './news/news.module';
import { PaymentModule } from './payment/payment.module';
import { DestinationModule } from './destination/destination.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [FlightModule, ConfigModule.forRoot({
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number(),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
      JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
      JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
    })
  }), JwtModule.registerAsync({
    global: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
      },
    })
  }), CacheModule.registerAsync({
    isGlobal: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      max: Number(configService.get('MAX_CACHE_QUANTITY')),
      ttl: Number(configService.get('MAX_CACHE_TTL')),
    }),
  }),
    DatabaseModule, AuthenticationModule, UserModule, AirportModule, BookingModule, ReportModule,  PromotionModule, NewsModule, PaymentModule, DestinationModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})

export class AppModule {}
