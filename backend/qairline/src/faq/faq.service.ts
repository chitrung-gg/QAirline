import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/createFaq.dto';
import { UpdateFaqDto } from './dto/updateFaq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from './entity/faq.entity';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  async createFaq(faq: CreateFaqDto) {
    await this.cacheManager.reset()
    const newFaq = await this.faqRepository.create(faq)
    await this.faqRepository.save(newFaq)
    return newFaq
  }

  getAllFaq() {
    return this.faqRepository.find()
  }

  async getFaqById(id: number) {
    // TODO: may change to find with string for real case purposes
    const faq = await this.faqRepository.findOne({
      where: {
        id: id
      }
    });
    if (faq) {
      return faq;
    }
    throw new HttpException('Exception found in FaqService: getFaqById', HttpStatus.BAD_REQUEST)
  }

  async updateFaq(id: number, faq: UpdateFaqDto) {
    await this.cacheManager.reset()
    try {
      await this.getFaqById(id)
      await this.faqRepository.update(id, faq)
    } catch (error) {
      throw new HttpException('Exception found in FaqService: updateFaq', HttpStatus.BAD_REQUEST)
    }
  }

  async deleteFaq(id: number) {
    await this.cacheManager.reset()
    const deleteResponse = await this.faqRepository.delete(id)
    if (!deleteResponse.affected) {
      throw new HttpException('Exception found in FaqService: deleteFaq', HttpStatus.NOT_FOUND);
    }
  }
}
