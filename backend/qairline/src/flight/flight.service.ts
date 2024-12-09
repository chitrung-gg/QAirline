import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Flight } from "./entity/flight.entity";
import { DataSource, Repository } from "typeorm";
import { CreateFlightDto } from "./dto/createFlight.dto";
import { UpdateFlightDto } from "./dto/updateFlight.dto";
import { FlightNotFoundException } from "./exception/flightNotFound.exception";
import { AircraftService } from "src/aircraft/aircraft.service";
import { Cache, CACHE_MANAGER, CacheKey } from "@nestjs/cache-manager";
import { Worker } from "worker_threads";
import * as path from "path";
import { SearchFlightDto } from "./dto/searchFlight.dto";
import { Airport } from "src/airport/entity/airport.entity";

@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private flightRepository: Repository<Flight>,
        @InjectRepository(Airport)
        private airportRepository: Repository<Airport>,
        private dataSource: DataSource,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
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
        await this.cacheManager.reset()
        const newFlight = await this.flightRepository.create(flight)
        this.setDuration(newFlight.departureTime, newFlight.arrivalTime)
        // flight.seatClasses = {
        //     ...(await this.aircraftService.getAircraftById(flight.aircraft.id)).seatClasses
        // }
        await this.flightRepository.save(newFlight)
        return newFlight
    }

    async searchFlight(flight: SearchFlightDto) {
        // await this.cacheManager.reset()
        const departureAirport = await this.airportRepository.findOne({
            where: { city: flight.departureCity },
        });
    
        const arrivalAirport = await this.airportRepository.findOne({
            where: { city: flight.arrivalCity },
        });
    
        if (!departureAirport || !arrivalAirport) {
            throw new HttpException('Exception found in FlightService: searchFlight', HttpStatus.BAD_REQUEST)
            // throw new Error('Invalid departure or arrival airport code');
        }

        let query = this.flightRepository
            .createQueryBuilder('flight')
            .where('flight.departureAirportId = :departureAirportId', {
                departureAirportId: departureAirport.id,
            })
            .andWhere('flight.arrivalAirportId = :arrivalAirportId', {
                arrivalAirportId: arrivalAirport.id,
            })
            .andWhere('flight.availableSeats >= :passengerCount', { passengerCount: flight.passengerCount})
            .andWhere('flight.departureTime >= :departureDate', { departureDate: flight.departureDate });

        // If it's a round-trip search, add conditions for return date
        if (flight.isRoundTrip) {
            if (flight.returnDate) {
                query = query.andWhere('flight.departureTime >= :returnDate', { returnDate: flight.returnDate });
            } else {
                throw new HttpException('Exception found in FlightService: searchFlight', HttpStatus.BAD_REQUEST)
            }
        } 

        // Execute the query
        const flightResult =  await query.getMany();
        return flightResult
    }

    async getAllFlights() {
        const flights = await this.flightRepository.find()
        return new Promise((resolve, reject) => {
            const worker = new Worker(__dirname + '/worker/flight.worker.js');
            worker.postMessage({ flights });

            worker.on('message', (result) => {
                // Handle result from the worker thread
                resolve(result.processedFlights);
            });

            worker.on('error', (error) => {
                // Handle error from the worker thread
                reject(error);
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }

    async getFlightById(id: number) {
        // TODO: may change to find with string for real case purposes
        // const flight = await new Promise<Flight>((resolve) => {
        //     setTimeout(async () => {
        //         const result = await this.flightRepository.findOne({
        //             where: {
        //                 id: id
        //             }
        //         });
        //         resolve(result);
        //     }, 1000);
        // });
        const flight = await this.flightRepository.findOne({
            where: {
                id: id
            }
        });
        if (flight) {
            return flight;
        } else {
            throw new HttpException('Exception found in FlightService: getFlightById', HttpStatus.BAD_REQUEST)
        }
    }

    async getAircraftById(id: number) {
        const flight = await this.flightRepository.findOne({
            where: {
                id: id
            }
        });

        return flight.aircraft;
    }

    async updateFlight(id: number, flight: UpdateFlightDto) {
        await this.cacheManager.reset()
        try {
            await this.getFlightById(id)

            await this.flightRepository.update(id, {
                ...flight,
                duration: await this.setDuration(flight.departureTime, flight.arrivalTime)
            })
        } catch (error) {
            throw new HttpException('Exception found in FlightService: updateFlight', HttpStatus.BAD_REQUEST)
        }
    }

    async deleteFlight(id: number) {
        await this.cacheManager.reset()
        const deleteResponse = await this.flightRepository.delete(id)
        if (!deleteResponse.affected) {
            throw new HttpException('Exception found in FlightService: deleteFlight', HttpStatus.NOT_FOUND);
        }
    }
}