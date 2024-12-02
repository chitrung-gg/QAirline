import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Flight } from "./entity/flight.entity";
import { Repository } from "typeorm";
import { CreateFlightDto } from "./dto/createFlight.dto";
import { UpdateFlightDto } from "./dto/updateFlight.dto";
import { FlightNotFoundException } from "./exception/flightNotFound.exception";
import { AircraftService } from "src/aircraft/aircraft.service";

@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private flightRepository: Repository<Flight>,
        private aircraftService: AircraftService
    ) {}

    async setDuration(departureTime: string, arrivalTime: string) {
        const departure = new Date(departureTime).getTime();
        const arrival = new Date(arrivalTime).getTime();

        const diff = arrival - departure;

        return diff / (1000 * 60 * 60); // 1000ms = 1s, 60s = 1m, 60m = 1h
    }

    async setSeatClasses(aircraftService: AircraftService, flight: Flight) {
        // flight.seatClasses = {
        //     ...(await aircraftService.getAircraftById(flight.aircraft.id)).seatClasses
        // }
    }

    async createFlight(flight: CreateFlightDto) {
        const newFlight = await this.flightRepository.create(flight)
        this.setDuration(newFlight.departureTime, newFlight.arrivalTime)
        // flight.seatClasses = {
        //     ...(await this.aircraftService.getAircraftById(flight.aircraft.id)).seatClasses
        // }
        await this.flightRepository.save(newFlight)
        return newFlight
    }

    getAllFlights() {
        return this.flightRepository.find()
    }

    async getFlightById(id: number) {
        // TODO: may change to find with string for real case purposes
        const flight = await this.flightRepository.findOne({
            where: {
                id: id
            }
        });
        if (flight) {
            return flight;
        }
        throw new FlightNotFoundException(id)
    }

    async updateFlight(id: number, flight: UpdateFlightDto) {
        await this.flightRepository.update(id, {
            ...flight,
            duration: await this.setDuration(flight.departureTime, flight.arrivalTime)
        })

        this.getFlightById(id)
    }

    async deleteFlight(id: number) {
        const deleteResponse = await this.flightRepository.delete(id)
        if (!deleteResponse.affected) {
            throw new HttpException('Exception found in FlightService: deleteFlight', HttpStatus.NOT_FOUND);
        }
    }
}