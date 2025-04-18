import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entity/news.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  async createNews(news: CreateNewsDto) {
    await this.cacheManager.reset()
    const newNews = await this.newsRepository.create(news)
    await this.newsRepository.save(newNews)
    return newNews
  }

  getAllNews() {
    return this.newsRepository.find()
  }

  async getNewsById(id: number) {
    // TODO: may change to find with string for real case purposes
    const news = await this.newsRepository.findOne({
      where: {
        id: id
      }
    });
    if (news) {
      return news;
    }
    throw new HttpException('Exception found in NewsService: getNewsById', HttpStatus.BAD_REQUEST)
  }

  async updateNews(id: number, News: UpdateNewsDto) {
    await this.cacheManager.reset()
    try {
      await this.getNewsById(id)
      await this.newsRepository.update(id, News)
    } catch (error) {
      throw new HttpException('Exception found in NewsService: updateNews', HttpStatus.BAD_REQUEST)
    }
  }

  async deleteNews(id: number) {
    await this.cacheManager.reset()
    const news = await this.getNewsById(id)
    if (!news.isPublished) {
      throw new HttpException('News already published, not deletable', HttpStatus.NOT_ACCEPTABLE);
    }
    const deleteResponse = await this.newsRepository.delete(id)
    if (!deleteResponse.affected) {
      throw new HttpException('Exception found in NewsService: deleteNews', HttpStatus.NOT_FOUND);
    }
  }
}
