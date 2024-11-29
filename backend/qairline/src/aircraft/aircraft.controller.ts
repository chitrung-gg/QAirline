import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AircraftService } from "./aircraft.service";
import { CreateAircraftDto } from "./dto/createAircraft.dto";
import { UpdateAircraftDto } from "./dto/updateAircraft.dto";

@Controller('aircraft')
export class AircraftController {
    constructor(private aircraftService: AircraftService) {}

    @Post()
    async createAircraft(@Body() createAircraftDto: CreateAircraftDto) {
        return this.aircraftService.createAircraft(createAircraftDto)
    } 

    @Get()
    async getAllAircrafts() {
        return this.aircraftService.getAllAircrafts()
    }

    @Get(':id')
    async getAircraftById(@Param('id') id: number) {
        return this.aircraftService.getAircraftById(id)
    }

    @Patch(':id')
    async updateAircraft(@Param('id') id: number, @Body() updateAircraftDto: UpdateAircraftDto) {
        return this.aircraftService.updateAircraft(id, updateAircraftDto);
    }

    @Delete(':id') 
    async deleteAircraft(@Param('id') id: number) {
        return this.aircraftService.deleteAircraft(id)
    }
}