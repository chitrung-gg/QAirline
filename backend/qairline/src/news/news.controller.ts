import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async createNews(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.createNews(createNewsDto);
  }

  @Get()
  getAllNewss() {
    return this.newsService.getAllNews();
  }

  @Get(':id')
  getNewsById(@Param('id') id: number) {
    return this.newsService.getNewsById(id);
  }

  @Patch(':id')
  async updateNews(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.updateNews(id, updateNewsDto);
  }

  @Delete(':id')
  async deleteNews(@Param('id') id: number) {
    return this.newsService.deleteNews(id);
  }
}
