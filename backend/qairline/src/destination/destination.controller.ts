import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/createDestination.dto';
import { UpdateDestinationDto } from './dto/updateDestination.dto';

@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  async createDestination(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.createDestination(createDestinationDto);
  }

  @Get()
  getAllDestinations() {
    return this.destinationService.getAllDestinations();
  }

  @Get(':id')
  getDestinationById(@Param('id') id: number) {
    return this.destinationService.getDestinationById(id);
  }

  @Patch(':id')
  async updateDestination(@Param('id') id: number, @Body() updateDestinationDto: UpdateDestinationDto) {
    return this.destinationService.updateDestination(id, updateDestinationDto);
  }

  @Delete(':id')
  async deleteDestination(@Param('id') id: number) {
    return this.destinationService.deleteDestination(id);
  }
}
