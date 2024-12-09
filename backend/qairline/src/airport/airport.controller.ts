import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { AirportService } from './airport.service';
import { CreateAirportDto } from './dto/createAirport.dto';
import { UpdateAirportDto } from './dto/updateAirport.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('airport')
@Controller('airport')
@UseInterceptors(CacheInterceptor)
export class AirportController {
    constructor(private readonly airportService: AirportService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new airport' })
    @ApiBody({ type: () => CreateAirportDto })
    @ApiResponse({ status: 201, description: 'The airport has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async createAirport(@Body() createAirportDto: CreateAirportDto) {
        return this.airportService.createAirport(createAirportDto)
    } 

    @Get()
    @ApiOperation({ summary: 'Get all airports' })
    @ApiResponse({ status: 200, description: 'Return all airports.' })
    async getAllAirports() {
        return this.airportService.getAllAirports()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get airport by ID' })
    @ApiParam({ name: 'id', description: 'ID of the airport', example: 1 })
    @ApiResponse({ status: 200, description: 'Return the airport with the specified ID.' })
    @ApiResponse({ status: 404, description: 'Airport not found.' })
    async getAirportById(@Param('id') id: number) {
        return this.airportService.getAirportById(id)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update airport by ID' })
    @ApiParam({ name: 'id', description: 'ID of the airport', example: 1 })
    @ApiBody({ type: () => UpdateAirportDto })
    @ApiResponse({ status: 200, description: 'The airport has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Airport not found.' })
    async updateAirport(@Param('id') id: number, @Body() updateAirportDto: UpdateAirportDto) {
        return this.airportService.updateAirport(id, updateAirportDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete airport by ID' })
    @ApiParam({ name: 'id', description: 'ID of the airport', example: 1 })
    @ApiResponse({ status: 200, description: 'The airport has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Airport not found.' })
    async deleteAirport(@Param('id') id: number) {
        return this.airportService.deleteAirport(id)
    }
}
