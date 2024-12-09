import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/createFaq.dto';
import { UpdateFaqDto } from './dto/updateFaq.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('faq')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new FAQ' })
  @ApiBody({ type: () => CreateFaqDto })
  @ApiResponse({ status: 201, description: 'The FAQ has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createFaq(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.createFaq(createFaqDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all FAQs' })
  @ApiResponse({ status: 200, description: 'Return all FAQs.' })
  getAllFaq() {
    return this.faqService.getAllFaq();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get FAQ by ID' })
  @ApiParam({ name: 'id', description: 'ID of the FAQ', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the FAQ with the specified ID.' })
  @ApiResponse({ status: 404, description: 'FAQ not found.' })
  getFaqById(@Param('id') id: number) {
    return this.faqService.getFaqById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update FAQ by ID' })
  @ApiParam({ name: 'id', description: 'ID of the FAQ', example: 1 })
  @ApiBody({ type: () => UpdateFaqDto })
  @ApiResponse({ status: 200, description: 'The FAQ has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'FAQ not found.' })
  async updateFaq(@Param('id') id: number, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.updateFaq(id, updateFaqDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete FAQ by ID' })
  @ApiParam({ name: 'id', description: 'ID of the FAQ', example: 1 })
  @ApiResponse({ status: 200, description: 'The FAQ has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'FAQ not found.' })
  async deleteFaq(@Param('id') id: number) {
    return this.faqService.deleteFaq(id);
  }
}
