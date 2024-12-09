import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/createDestination.dto';
import { UpdateDestinationDto } from './dto/updateDestination.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('destination')
@Controller('destination')
@UseInterceptors(CacheInterceptor)
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new destination' })
  @ApiBody({ type: () => CreateDestinationDto })
  @ApiResponse({ status: 201, description: 'The destination has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createDestination(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.createDestination(createDestinationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all destinations' })
  @ApiResponse({ status: 200, description: 'Return all destinations.' })
  getAllDestinations() {
    return this.destinationService.getAllDestinations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get destination by ID' })
  @ApiParam({ name: 'id', description: 'ID of the destination', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the destination with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Destination not found.' })
  getDestinationById(@Param('id') id: number) {
    return this.destinationService.getDestinationById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update destination by ID' })
  @ApiParam({ name: 'id', description: 'ID of the destination', example: 1 })
  @ApiBody({ type: () => UpdateDestinationDto })
  @ApiResponse({ status: 200, description: 'The destination has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Destination not found.' })
  async updateDestination(@Param('id') id: number, @Body() updateDestinationDto: UpdateDestinationDto) {
    return this.destinationService.updateDestination(id, updateDestinationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete destination by ID' })
  @ApiParam({ name: 'id', description: 'ID of the destination', example: 1 })
  @ApiResponse({ status: 200, description: 'The destination has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Destination not found.' })
  async deleteDestination(@Param('id') id: number) {
    return this.destinationService.deleteDestination(id);
  }
}
