import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Aircraft } from "./entity/aircraft.entity";
import { CreateAircraftDto } from "./dto/createAircraft.dto";
import { UpdateAircraftDto } from "./dto/updateAircraft.dto";

@Injectable()
export class AircraftService {
    constructor(
        @InjectRepository(Aircraft)
        private aircraftRepository: Repository<Aircraft>
    ) {}

    async createAircraft(aircraft: CreateAircraftDto) {
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
        await this.aircraftRepository.update(id, aircraft)
        this.getAircraftById(id)
    }

    async deleteAircraft(id: number) {
        const deleteAircraftResponse = await this.aircraftRepository.delete(id)
        if (!deleteAircraftResponse) {
            throw new HttpException('Exception found in AircraftService: deleteAircraft', HttpStatus.BAD_REQUEST)
        }
    }
}