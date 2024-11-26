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
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';


@Module({
  imports: [FlightModule, ConfigModule.forRoot({
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      PORT: Joi.number(),
    })
  }), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
