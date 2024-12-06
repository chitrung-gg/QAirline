import { HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Aircraft } from "./entity/aircraft.entity";
import { CreateAircraftDto } from "./dto/createAircraft.dto";
import { UpdateAircraftDto } from "./dto/updateAircraft.dto";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class AircraftService {
    constructor(
        @InjectRepository(Aircraft)
        private aircraftRepository: Repository<Aircraft>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {}

    async createAircraft(aircraft: CreateAircraftDto) {
        await this.cacheManager.reset()
        const newAircraft = await this.aircraftRepository.create(aircraft)
        await this.aircraftRepository.save(newAircraft)
        return newAircraft
    }

    async getAllAircrafts() {
        return this.aircraftRepository.find()
    }

    async getAircraftById(id: number) {
        const aircraft = this.aircraftRepository.findOne({
            where: {
                id: id
            }
        })
        if (aircraft) {
            return aircraft
        }
        throw new HttpException('Exception found in AircraftService: getAircratfById', HttpStatus.BAD_REQUEST)
    }

    async updateAircraft(id: number, aircraft: UpdateAircraftDto) {
        await this.cacheManager.reset()
        try {
            await this.getAircraftById(id)
            await this.aircraftRepository.update(id, aircraft)
        } catch (error) {
            throw new HttpException('Exception found in AircraftService: updateAircraft', HttpStatus.BAD_REQUEST)
        }
    }

    async deleteAircraft(id: number) {
        await this.cacheManager.reset()
        const deleteAircraftResponse = await this.aircraftRepository.delete(id)
        if (!deleteAircraftResponse.affected) {
            throw new HttpException('Exception found in AircraftService: deleteAircraft', HttpStatus.BAD_REQUEST)
        }
    }
}