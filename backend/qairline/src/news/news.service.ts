import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entity/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>
  ) {}

  async createNews(news: CreateNewsDto) {
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
    await this.newsRepository.update(id, News)
    this.getNewsById(id)
  }

  async deleteNews(id: number) {
    const deleteResponse = await this.newsRepository.delete(id)
    if (!deleteResponse.affected) {
      throw new HttpException('Exception found in NewsService: deleteNews', HttpStatus.NOT_FOUND);
    }
  }
}
