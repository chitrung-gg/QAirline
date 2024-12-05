import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDestinationDto } from './dto/createDestination.dto';
import { UpdateDestinationDto } from './dto/updateDestination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './entity/destination.entity';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private destinationRepository: Repository<Destination>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  async createDestination(Destination: CreateDestinationDto) {
    const newDestination = await this.destinationRepository.create(Destination)
    await this.destinationRepository.save(newDestination)
    return newDestination
  }

  getAllDestinations() {
    return this.destinationRepository.find()
  }

  async getDestinationById(id: number) {
    // TODO: may change to find with string for real case purposes
    const destination = await this.destinationRepository.findOne({
      where: {
        id: id
      }
    });
    if (destination) {
      return destination;
    }
    throw new HttpException('Exception found in DestinationService: getDestinationById', HttpStatus.BAD_REQUEST)
  }

  async updateDestination(id: number, destination: UpdateDestinationDto) {
    await this.destinationRepository.update(id, destination)
    this.getDestinationById(id)
  }

  async deleteDestination(id: number) {
    const deleteResponse = await this.destinationRepository.delete(id)
    if (!deleteResponse.affected) {
      throw new HttpException('Exception found in BookingService: deleteBooking', HttpStatus.NOT_FOUND);
    }
  }
}
