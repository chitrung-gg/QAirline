import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { CreateAboutusDto } from './dto/createAboutus.dto';
import { UpdateAboutusDto } from './dto/updateAboutus.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('aboutus')
@Controller('aboutus')
export class AboutusController {
  constructor(private readonly aboutusService: AboutusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new About Us section' })
  @ApiBody({ type: () => CreateAboutusDto })
  @ApiResponse({ status: 201, description: 'The About Us section has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createAboutus(@Body() createAboutusDto: CreateAboutusDto) {
    return this.aboutusService.createAboutus(createAboutusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all About Us sections' })
  @ApiResponse({ status: 200, description: 'Return all About Us sections.' })
  getAllAboutus() {
    return this.aboutusService.getAllAboutus();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get About Us section by ID' })
  @ApiParam({ name: 'id', description: 'ID of the About Us section', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the About Us section with the specified ID.' })
  @ApiResponse({ status: 404, description: 'About Us section not found.' })
  getAboutusById(@Param('id') id: number) {
    return this.aboutusService.getAboutusById(id);
  }

  @Get('title/:title')
  @ApiOperation({ summary: 'Get About Us section by title' })
  @ApiParam({ name: 'title', description: 'Title of the About Us section', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the About Us section with the specified title' })
  @ApiResponse({ status: 404, description: 'About Us section not found.' })
  getAboutusByTitle(@Param('title') title: string) {
    return this.aboutusService.getAboutusByTitle(title);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update About Us section by ID' })
  @ApiParam({ name: 'id', description: 'ID of the About Us section', example: 1 })
  @ApiBody({ type: () => UpdateAboutusDto })
  @ApiResponse({ status: 200, description: 'The About Us section has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'About Us section not found.' })
  async updateAboutus(@Param('id') id: number, @Body() updateAboutusDto: UpdateAboutusDto) {
    return this.aboutusService.updateAboutus(id, updateAboutusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete About Us section by ID' })
  @ApiParam({ name: 'id', description: 'ID of the About Us section', example: 1 })
  @ApiResponse({ status: 200, description: 'The About Us section has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'About Us section not found.' })
  async deleteAboutus(@Param('id') id: number) {
    return this.aboutusService.deleteAboutus(id);
  }
}
