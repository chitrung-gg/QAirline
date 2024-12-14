import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
@UseInterceptors(CacheInterceptor)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new news article' })
  @ApiBody({ type: () => CreateNewsDto })
  @ApiResponse({ status: 201, description: 'The news article has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createNews(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.createNews(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news articles' })
  @ApiResponse({ status: 200, description: 'Return all news articles.' })
  getAllNews() {
    return this.newsService.getAllNews();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get news article by ID' })
  @ApiParam({ name: 'id', description: 'ID of the news article', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the news article with the specified ID.' })
  @ApiResponse({ status: 404, description: 'News article not found.' })
  getNewsById(@Param('id') id: number) {
    return this.newsService.getNewsById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update news article by ID' })
  @ApiParam({ name: 'id', description: 'ID of the news article', example: 1 })
  @ApiBody({ type: () => UpdateNewsDto })
  @ApiResponse({ status: 200, description: 'The news article has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'News article not found.' })
  async updateNews(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.updateNews(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete news article by ID' })
  @ApiParam({ name: 'id', description: 'ID of the news article', example: 1 })
  @ApiResponse({ status: 200, description: 'The news article has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'News article not found.' })
  async deleteNews(@Param('id') id: number) {
    return this.newsService.deleteNews(id);
  }
}
