import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/createPromotion.dto';
import { UpdatePromotionDto } from './dto/updatePromotion.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('promotion')
@UseInterceptors(CacheInterceptor)
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  async createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
      return this.promotionService.createPromotion(createPromotionDto)
  } 

  @Get()
  async getAllPromotions() {
      return this.promotionService.getAllPromotions()
  }

  @Get(':id')
  async getPromotionById(@Param('id') id: number) {
      return this.promotionService.getPromotionById(id)
  }

  @Patch(':id')
  async updatePromotion(@Param('id') id: number, @Body() updatePromotionDto: UpdatePromotionDto) {
      return this.promotionService.updatePromotion(id, updatePromotionDto);
  }

  @Delete(':id') 
  async deletePromotion(@Param('id') id: number) {
      return this.promotionService.deletePromotion(id)
  }
}
