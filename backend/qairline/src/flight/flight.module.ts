import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flight } from "./entity/flight.entity";
import { FlightService } from "./flight.service";
import { FlightController } from "./flight.controller";
import { AircraftService } from "src/aircraft/aircraft.service";
import { AircraftModule } from "src/aircraft/aircraft.module";

@Module({
    imports: [AircraftModule, TypeOrmModule.forFeature([Flight])],
    providers: [FlightService],
    controllers: [FlightController],
    exports: [FlightService]
})
export class FlightModule {

}