import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { AircraftService } from "./aircraft.service";
import { CreateAircraftDto } from "./dto/createAircraft.dto";
import { UpdateAircraftDto } from "./dto/updateAircraft.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";

@ApiTags('aircraft')
@Controller('aircraft')
@UseInterceptors(CacheInterceptor)
export class AircraftController {
    constructor(private readonly aircraftService: AircraftService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new aircraft' })
    @ApiBody({ type: () => CreateAircraftDto })
    @ApiResponse({ status: 201, description: 'The aircraft has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    async createAircraft(@Body() createAircraftDto: CreateAircraftDto) {
        return this.aircraftService.createAircraft(createAircraftDto)
    } 

    @Get()
    @ApiOperation({ summary: 'Get all aircrafts' })
    @ApiResponse({ status: 200, description: 'Return all aircrafts.' })
    async getAllAircrafts() {
        return this.aircraftService.getAllAircrafts()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get aircraft by ID' })
    @ApiParam({ name: 'id', description: 'ID of the aircraft', example: 1 })
    @ApiResponse({ status: 200, description: 'Return the aircraft with the specified ID.' })
    @ApiResponse({ status: 404, description: 'Aircraft not found.' })
    async getAircraftById(@Param('id') id: number) {
        return this.aircraftService.getAircraftById(id)
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update aircraft by ID' })
    @ApiParam({ name: 'id', description: 'ID of the aircraft', example: 1 })
    @ApiBody({ type: () => UpdateAircraftDto })
    @ApiResponse({ status: 200, description: 'The aircraft has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Aircraft not found.' })
    async updateAircraft(@Param('id') id: number, @Body() updateAircraftDto: UpdateAircraftDto) {
        return this.aircraftService.updateAircraft(id, updateAircraftDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete aircraft by ID' })
    @ApiParam({ name: 'id', description: 'ID of the aircraft', example: 1 })
    @ApiResponse({ status: 200, description: 'The aircraft has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Aircraft not found.' })
    async deleteAircraft(@Param('id') id: number) {
        return this.aircraftService.deleteAircraft(id)
    }
}