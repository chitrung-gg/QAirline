import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
@UseInterceptors(CacheInterceptor)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiBody({ type: () => CreatePaymentDto })
  @ApiResponse({ status: 201, description: 'The payment has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
      return this.paymentService.createPayment(createPaymentDto)
  } 

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({ status: 200, description: 'Return all payments.' })
  async getAllPayments() {
      return this.paymentService.getAllPayments()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiParam({ name: 'id', description: 'ID of the payment', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the payment with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async getPaymentById(@Param('id') id: number) {
      return this.paymentService.getPaymentById(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update payment by ID' })
  @ApiParam({ name: 'id', description: 'ID of the payment', example: 1 })
  @ApiBody({ type: () => UpdatePaymentDto })
  @ApiResponse({ status: 200, description: 'The payment has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async updatePayment(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
      return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @Delete(':id') 
  @ApiOperation({ summary: 'Delete payment by ID' })
  @ApiParam({ name: 'id', description: 'ID of the payment', example: 1 })
  @ApiResponse({ status: 200, description: 'The payment has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async deletePayment(@Param('id') id: number) {
      return this.paymentService.deletePayment(id)
  }
}
