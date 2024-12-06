import { Controller, Post, Body, Patch, Param, Get, Delete, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/createFlight.dto';
import { UpdateFlightDto } from './dto/updateFlight.dto';
import { JwtAuthenticationGuard } from 'src/authentication/guard/jwtAuthentication.guard';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { SearchFlightDto } from './dto/searchFlight.dto';


@Controller('flight')
// @CacheKey('GET_FLIGHTS_CACHE_KEY')
export class FlightController {
    constructor(private flightService: FlightService) {}

    @Post()
    async createFlight(@Body() createFlightDto: CreateFlightDto) {
      return this.flightService.createFlight(createFlightDto);
    }

    @Get('search')
    async searchFlight(@Query() searchFlightDto: SearchFlightDto) {
      return this.flightService.searchFlight(searchFlightDto)
    }

    @Get()
    getAllFlights() {
      return this.flightService.getAllFlights();
    }

    @Get(':id')
    getFlightById(@Param('id') id: number) {
      return this.flightService.getFlightById(id)
    }

    @Get(':id/aircraft')
    getAircraftById(@Param('id') id: number) {
      return this.flightService.getAircraftById(id)
    }

    @Patch(':id')
    async updateFlight(@Param('id') id: number, @Body() updateFlightDto: UpdateFlightDto) {
      return this.flightService.updateFlight(id, updateFlightDto);
    }

    @Delete(':id') 
    // @UseGuards(JwtAuthenticationGuard)
    async deleteFlight(@Param('id') id: number) {
      return this.flightService.deleteFlight(id)
    }
}
