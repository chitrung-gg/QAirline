import { Controller, Post, Body, Patch, Param, Get, Delete } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';


@Controller('flights')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @Post()
  async createFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.createFlight(createFlightDto);
  }

  @Get()
  getAllFlights() {
    return this.flightService.getAllFlights();
  }

  @Get(':id')
  getFlightById(@Param('id') id: number) {
    return this.flightService.getFlightById(id)
  }

  @Patch(':id')
  async updateFlight(@Param('id') id: number, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.updateFlight(id, updateFlightDto);
  }

  @Delete(':id') 
  async deleteFlight(@Param('id') id: number) {
    return this.flightService.deleteFlight(id)
  }
}