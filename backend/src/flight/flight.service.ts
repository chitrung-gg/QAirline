import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Flight } from "./entity/flight.entity";
import { Repository } from "typeorm";
import { CreateFlightDto } from "./dto/create-flight.dto";
import { UpdateFlightDto } from "./dto/update-flight.dto";

@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private flightRepository: Repository<Flight>,
    ) {}

    async create(createFlightDto: CreateFlightDto): Promise<Flight> {
        return this.flightRepository.save({
            flightNumber: createFlightDto.flightNumber,
            departureAirport: {id: createFlightDto.departureAirportId},
            arrivalAirport: {id: createFlightDto.arrivalAirportId},
            departureTime: createFlightDto.departureTime,
            arrivalTime: createFlightDto.arrivalTime,
            availableSeats: createFlightDto.availableSeats,
        })
    }

    async findAll(): Promise<Flight[]> {
        return this.flightRepository.find()
    }

    async findOne(id: number): Promise<Flight> {
        return this.flightRepository.findOne({
            where: {id},
        });
    }
    
    async update(id: number, updateFlightDto: UpdateFlightDto): Promise<Flight> {
        await this.flightRepository.update(id, {
            flightNumber: updateFlightDto.flightNumber,
            departureAirport: {id: updateFlightDto.departureAirportId},
            arrivalAirport: {id: updateFlightDto.arrivalAirportId},
            departureTime: updateFlightDto.departureTime,
            arrivalTime: updateFlightDto.arrivalTime,
            availableSeats: updateFlightDto.availableSeats,
        })
        return this.findOne(id)
    }

    async remove(id: number): Promise<void> {
        await this.flightRepository.delete(id);
    }
    
    // async findByLocation(location: string): Promise<Flight[]> {
    //     return this.flightRepository.find({
    //         where: { location: { } },
    //     });
    // }
}