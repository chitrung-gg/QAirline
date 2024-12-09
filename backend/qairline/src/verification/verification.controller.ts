import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './dto/createVerification.dto';
import { UpdateVerificationDto } from './dto/updateVerification.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('verification')
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new verification' })
  @ApiBody({ type: () => CreateVerificationDto })
  @ApiResponse({ status: 201, description: 'The verification has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createVerification(@Body() createVerificationDto: CreateVerificationDto) {
    return this.verificationService.createVerification(createVerificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all verifications' })
  @ApiResponse({ status: 200, description: 'Return all verifications.' })
  getAllVerifications() {
    return this.verificationService.getAllVerifications();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get verification by ID' })
  @ApiParam({ name: 'id', description: 'ID of the verification', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the verification with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Verification not found.' })
  getVerificationById(@Param('id') id: number) {
    return this.verificationService.getVerificationById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update verification by ID' })
  @ApiParam({ name: 'id', description: 'ID of the verification', example: 1 })
  @ApiBody({ type: () => UpdateVerificationDto })
  @ApiResponse({ status: 200, description: 'The verification has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Verification not found.' })
  async updateVerification(@Param('id') id: number, @Body() updateVerificationDto: UpdateVerificationDto) {
    return this.verificationService.updateVerification(id, updateVerificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete verification by ID' })
  @ApiParam({ name: 'id', description: 'ID of the verification', example: 1 })
  @ApiResponse({ status: 200, description: 'The verification has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Verification not found.' })
  async deleteVerification(@Param('id') id: number) {
    return this.verificationService.deleteVerification(id);
  }
}
