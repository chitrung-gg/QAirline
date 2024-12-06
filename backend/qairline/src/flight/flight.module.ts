import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Flight } from "./entity/flight.entity";
import { FlightService } from "./flight.service";
import { FlightController } from "./flight.controller";
import { AirportModule } from "src/airport/airport.module";
import { AircraftModule } from "src/aircraft/aircraft.module";
import { Airport } from "src/airport/entity/airport.entity";
import { Aircraft } from "src/aircraft/entity/aircraft.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Flight, Airport, Aircraft])],
    providers: [FlightService],
    controllers: [FlightController],
    exports: [FlightService]
})
export class FlightModule {

}