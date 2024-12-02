import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AirportService } from './airport.service';
import { CreateAirportDto } from './dto/createAirport.dto';
import { UpdateAirportDto } from './dto/updateAirport.dto';

@Controller('airport')
export class AirportController {
	constructor(private readonly airportService: AirportService) {}

    @Post()
    async createAirport(@Body() createAirportDto: CreateAirportDto) {
        return this.airportService.createAirport(createAirportDto)
    } 

    @Get()
    async getAllAirports() {
        return this.airportService.getAllAirports()
    }

    @Get(':id')
    async getAirportById(@Param('id') id: number) {
        return this.airportService.getAirportById(id)
    }

    @Patch(':id')
    async updateAirport(@Param('id') id: number, @Body() updateAirportDto: UpdateAirportDto) {
        return this.airportService.updateAirport(id, updateAirportDto);
    }

    @Delete(':id') 
    async deleteAirport(@Param('id') id: number) {
        return this.airportService.deleteAirport(id)
    }
}
