import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './dto/createVerification.dto';
import { UpdateVerificationDto } from './dto/updateVerification.dto';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  async createVerification(@Body() createVerificationDto: CreateVerificationDto) {
    return this.verificationService.createVerification(createVerificationDto);
  }

  @Get()
  getAllVerifications() {
    return this.verificationService.getAllVerifications();
  }

  @Get(':id')
  getVerificationById(@Param('id') id: number) {
    return this.verificationService.getVerificationById(id);
  }

  @Patch(':id')
  async updateVerification(@Param('id') id: number, @Body() updateVerificationDto: UpdateVerificationDto) {
    return this.verificationService.updateVerification(id, updateVerificationDto);
  }

  @Delete(':id')
  async deleteVerification(@Param('id') id: number) {
    return this.verificationService.deleteVerification(id);
  }
}
