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


@Module({
  imports: [TypeOrmModule.forRoot(), FlightModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
