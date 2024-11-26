import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Flight } from "./entity/flight.entity";
import { Repository } from "typeorm";
import { CreateFlightDto } from "./dto/create-flight.dto";
import { UpdateFlightDto } from "./dto/update-flight.dto";
import { FlightNotFoundException } from "./exception/flight-not-found.exception";

@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private flightRepository: Repository<Flight>
    ) {}

    // async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    //     return this.flightRepository.save({
    //         flightNumber: createFlightDto.flightNumber,
    //         departureAirport: {id: createFlightDto.departureAirportId},
    //         arrivalAirport: {id: createFlightDto.arrivalAirportId},
    //         departureTime: createFlightDto.departureTime,
    //         arrivalTime: createFlightDto.arrivalTime,
    //         availableSeats: createFlightDto.availableSeats,
    //     })
    // }

    // async findAll(): Promise<Flight[]> {
    //     return this.flightRepository.find()
    // }

    // async findOne(id: number): Promise<Flight> {
    //     return this.flightRepository.findOne({
    //         where: {id},
    //     });
    // }
    
    // async update(id: number, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    //     await this.flightRepository.update(id, {
    //         flightNumber: updateFlightDto.flightNumber,
    //         departureAirport: {id: updateFlightDto.departureAirportId},
    //         arrivalAirport: {id: updateFlightDto.arrivalAirportId},
    //         departureTime: updateFlightDto.departureTime,
    //         arrivalTime: updateFlightDto.arrivalTime,
    //         availableSeats: updateFlightDto.availableSeats,
    //     })
    //     return this.findOne(id)
    // }

    // async remove(id: number): Promise<void> {
    //     await this.flightRepository.delete(id);
    // }
    
    // async findByLocation(location: string): Promise<Flight[]> {
    //     return this.flightRepository.find({
    //         where: { location: { } },
    //     });
    // }

    async createFlight(flight: CreateFlightDto) {
        const newFlight = await this.flightRepository.create(flight)
        await this.flightRepository.save(newFlight)
        return newFlight
    }

    getAllFlights() {
        return this.flightRepository.find()
    }

    async getFlightById(id: number) {
        // TODO: may change to find with string for real case purposes
        const post = await this.flightRepository.findOne({where: {id: id}});
        if (post) {
            return post;
        }
        throw new FlightNotFoundException(id)
    }

    async updateFlight(id: number, flight: UpdateFlightDto) {
        await this.flightRepository.update(id, flight)
        this.getFlightById(id)
    }

    async deleteFlight(id: number) {
        const deleteResponse = await this.flightRepository.delete(id)
        if (!deleteResponse.affected) {
            throw new HttpException('Flight not found', HttpStatus.NOT_FOUND);
        }
    }
}