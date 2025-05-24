import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FlightModule } from './flight/flight.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { JwtModule } from '@nestjs/jwt';

import { PromotionModule } from './promotion/promotion.module';

import { NewsModule } from './news/news.module';
import { PaymentModule } from './payment/payment.module';
import { DestinationModule } from './destination/destination.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { EmailModule } from './email/email.module';
import { PolicyModule } from './policy/policy.module';
import { FaqModule } from './faq/faq.module';
import { AboutusModule } from './aboutus/aboutus.module';
import * as redisStore from 'cache-manager-ioredis';

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
    // useFactory: async (configService: ConfigService) => ({
    //   max: Number(configService.get('MAX_CACHE_QUANTITY')),
    //   ttl: Number(configService.get('MAX_CACHE_TTL')),
    // }),
    useFactory: async (configService: ConfigService) => ({
      store: redisStore,
      host: String(configService.get('REDIS_HOST')),
      port: Number(configService.get('REDIS_PORT')),
      password: String(configService.get('REDIS_PASSWORD')),
      ttl: Number(configService.get('MAX_CACHE_TTL')), // in seconds
      max: Number(configService.get('MAX_CACHE_QUANTITY')),
      tls: {}, // Required for Azure Redis (SSL)
    }),
  }),
    DatabaseModule, AuthenticationModule, UserModule, BookingModule, PromotionModule, NewsModule, DestinationModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})

export class AppModule {}
