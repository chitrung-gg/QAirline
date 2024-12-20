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
    await this.cacheManager.reset()
    
    if (promotion.startDate > promotion.endDate) {
        throw new HttpException('Please check again the information startDate and endDate again', HttpStatus.NOT_ACCEPTABLE);
    }

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
          },
          relations: ['bookings']
      })
      if (promotion) {
          return promotion
      }
      throw new HttpException('Exception found in PromotionService: getPromotionById', HttpStatus.BAD_REQUEST)
  }

  async getPromotionByCode(code: string) {
      const promotion = this.promotionRepository.findOne({
          where: {
              code: code
          },
          relations: ['bookings']
      })
      if (promotion) {
          return promotion
      }
      throw new HttpException('Exception found in PromotionService: getPromotionByCode', HttpStatus.BAD_REQUEST)
  }

  async updatePromotion(id: number, promotion: UpdatePromotionDto) {
    await this.cacheManager.reset()
    try {
        await this.getPromotionById(id)
        if (promotion.startDate > promotion.endDate) {
            throw new HttpException('Please check again the information startDate and endDate again', HttpStatus.NOT_ACCEPTABLE);
        }
        await this.promotionRepository.update(id, promotion)
    } catch (error) {
        throw new HttpException('Exception found in PromotionService: updatePromotion', HttpStatus.BAD_REQUEST)
    }
  }

  async deletePromotion(id: number) {
    await this.cacheManager.reset()
    const promotion = await this.promotionRepository.findOne({
        where: {
            id: id
        },
        relations: ['bookings']
    })

    if (promotion.bookings.length) {
        throw new HttpException('Promotion already in used by some bookings', HttpStatus.NOT_ACCEPTABLE);
    }
      const deletePromotionResponse = await this.promotionRepository.delete(id)
      if (!deletePromotionResponse.affected) {
          throw new HttpException('Exception found in PromotionService: deletePromotion', HttpStatus.BAD_REQUEST)
      }
  }
}
