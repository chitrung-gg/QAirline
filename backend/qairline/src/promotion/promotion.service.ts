import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/createPromotion.dto';
import { UpdatePromotionDto } from './dto/updatePromotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entity/promotion.entity';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class PromotionService {
  constructor(
      @InjectRepository(Promotion)
      private promotionRepository: Repository<Promotion>,
      @Inject(CACHE_MANAGER)
      private cacheManager: Cache
  ) {}

  async createPromotion(promotion: CreatePromotionDto) {
      const newPromotion = await this.promotionRepository.create(promotion)
      await this.promotionRepository.save(newPromotion)
      return newPromotion
  }

  async getAllPromotions() {
      return this.promotionRepository.find()
  }

  async getPromotionById(id: number) {
      const promotion = this.promotionRepository.findOne({
          where: {
              id: id
          }
      })
      if (promotion) {
          return promotion
      }
      throw new HttpException('Exception found in PromotionService: getPromotionById', HttpStatus.BAD_REQUEST)
  }

  async updatePromotion(id: number, promotion: UpdatePromotionDto) {
      await this.promotionRepository.update(id, promotion)
      this.getPromotionById(id)
  }

  async deletePromotion(id: number) {
      const deletePromotionResponse = await this.promotionRepository.delete(id)
      if (!deletePromotionResponse) {
          throw new HttpException('Exception found in PromotionService: deletePromotion', HttpStatus.BAD_REQUEST)
      }
  }
}
