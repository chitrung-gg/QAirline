import { Controller, Post, Body, Patch, Param, Get, Delete } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';


@Controller('flights')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @Post()
  createFlight(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(id, updateFlightDto);
  }

  @Get()
  getAllFlights() {
    return this.flightService.findAll();
  }

  @Get(':id')
  getFlightById(@Param('id') id: number) {
    return this.flightService.findOne(id)
  }

  @Delete(':id') 
  deleteFlight(@Param('id') id: number) {
    return this.flightService.remove(id)
  }
}
