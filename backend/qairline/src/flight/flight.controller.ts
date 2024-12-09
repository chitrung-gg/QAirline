import { Controller, Post, Body, Patch, Param, Get, Delete, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/createFlight.dto';
import { UpdateFlightDto } from './dto/updateFlight.dto';
import { JwtAuthenticationGuard } from 'src/authentication/guard/jwtAuthentication.guard';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { SearchFlightDto } from './dto/searchFlight.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('flight')
@Controller('flight')
@UseInterceptors(CacheInterceptor)
export class FlightController {
    constructor(private flightService: FlightService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new flight' })
    @ApiBody({ type: () => CreateFlightDto })
    @ApiResponse({ status: 201, description: 'The flight has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async createFlight(@Body() createFlightDto: CreateFlightDto) {
      return this.flightService.createFlight(createFlightDto);
    }

    @Get('search')
    @ApiOperation({ summary: 'Search for flights' })
    @ApiQuery({ type: () => SearchFlightDto })
    @ApiResponse({ status: 200, description: 'Return the search results for flights.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async searchFlight(@Query() searchFlightDto: SearchFlightDto) {
      return this.flightService.searchFlight(searchFlightDto)
    }

    @Get()
    @ApiOperation({ summary: 'Get all flights' })
    @ApiResponse({ status: 200, description: 'Return all flights.' })
    getAllFlights() {
      return this.flightService.getAllFlights();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get flight by ID' })
    @ApiParam({ name: 'id', description: 'ID of the flight', example: 1 })
    @ApiResponse({ status: 200, description: 'Return the flight with the specified ID.' })
    @ApiResponse({ status: 404, description: 'Flight not found.' })
    getFlightById(@Param('id') id: number) {
      return this.flightService.getFlightById(id)
    }

    @Get(':id/aircraft')
    @ApiOperation({ summary: 'Get aircraft by flight ID' })
    @ApiParam({ name: 'id', description: 'ID of the flight', example: 1 })
    @ApiResponse({ status: 200, description: 'Return the aircraft associated with the specified flight ID.' })
    @ApiResponse({ status: 404, description: 'Aircraft not found.' })
    getAircraftById(@Param('id') id: number) {
      return this.flightService.getAircraftById(id)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update flight by ID' })
    @ApiParam({ name: 'id', description: 'ID of the flight', example: 1 })
    @ApiBody({ type: () => UpdateFlightDto })
    @ApiResponse({ status: 200, description: 'The flight has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Flight not found.' })
    async updateFlight(@Param('id') id: number, @Body() updateFlightDto: UpdateFlightDto) {
      return this.flightService.updateFlight(id, updateFlightDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete flight by ID' })
    @ApiParam({ name: 'id', description: 'ID of the flight', example: 1 })
    @ApiResponse({ status: 200, description: 'The flight has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Flight not found.' })
    async deleteFlight(@Param('id') id: number) {
      return this.flightService.deleteFlight(id)
    }
}
