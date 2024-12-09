import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/createPromotion.dto';
import { UpdatePromotionDto } from './dto/updatePromotion.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('promotion')
@Controller('promotion')
@UseInterceptors(CacheInterceptor)
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new promotion' })
  @ApiBody({ type: () => CreatePromotionDto })
  @ApiResponse({ status: 201, description: 'The promotion has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
      return this.promotionService.createPromotion(createPromotionDto)
  } 

  @Get()
  @ApiOperation({ summary: 'Get all promotions' })
  @ApiResponse({ status: 200, description: 'Return all promotions.' })
  async getAllPromotions() {
      return this.promotionService.getAllPromotions()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get promotion by ID' })
  @ApiParam({ name: 'id', description: 'ID of the promotion', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the promotion with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Promotion not found.' })
  async getPromotionById(@Param('id') id: number) {
      return this.promotionService.getPromotionById(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update promotion by ID' })
  @ApiParam({ name: 'id', description: 'ID of the promotion', example: 1 })
  @ApiBody({ type: () => UpdatePromotionDto })
  @ApiResponse({ status: 200, description: 'The promotion has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Promotion not found.' })
  async updatePromotion(@Param('id') id: number, @Body() updatePromotionDto: UpdatePromotionDto) {
      return this.promotionService.updatePromotion(id, updatePromotionDto);
  }

  @Delete(':id') 
  @ApiOperation({ summary: 'Delete promotion by ID' })
  @ApiParam({ name: 'id', description: 'ID of the promotion', example: 1 })
  @ApiResponse({ status: 200, description: 'The promotion has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Promotion not found.' })
  async deletePromotion(@Param('id') id: number) {
      return this.promotionService.deletePromotion(id)
  }
}
