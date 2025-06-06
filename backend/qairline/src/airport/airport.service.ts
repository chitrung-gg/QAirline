import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAirportDto } from './dto/createAirport.dto';
import { UpdateAirportDto } from './dto/updateAirport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Airport } from './entity/airport.entity';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AirportService {
	constructor(
        @InjectRepository(Airport)
        private airportRepository: Repository<Airport>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {}

    
    async createAirport(airport: CreateAirportDto) {
        await this.cacheManager.reset()
        const newAirport = await this.airportRepository.create(airport)
        await this.airportRepository.save(newAirport)
        return newAirport
    }

    async getAllAirports() {
        return this.airportRepository.find()
    }

    async getAirportById(id: number) {
        const airport = this.airportRepository.findOne({
            where: {
                id: id
            }
        })
        if (airport) {
            return airport
        }
        throw new HttpException('Exception found in AirportService: getAircratfById', HttpStatus.BAD_REQUEST)
    }

    async updateAirport(id: number, airport: UpdateAirportDto) {
        await this.cacheManager.reset()
        try {
            await this.getAirportById(id)
            await this.airportRepository.update(id, airport)
        } catch (error) {
            throw new HttpException('Exception found in AirportService: updateAirport', HttpStatus.BAD_REQUEST)
        }
    }

    async deleteAirport(id: number) {
        await this.cacheManager.reset()
        const deleteAirportResponse = await this.airportRepository.delete(id)
        if (!deleteAirportResponse.affected) {
            throw new HttpException('Exception found in AirportService: deleteAirport', HttpStatus.BAD_REQUEST)
        }
    }
}
