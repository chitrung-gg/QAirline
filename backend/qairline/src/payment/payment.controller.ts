import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
      return this.paymentService.createPayment(createPaymentDto)
  } 

  @Get()
  async getAllPayments() {
      return this.paymentService.getAllPayments()
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: number) {
      return this.paymentService.getPaymentById(id)
  }

  @Patch(':id')
  async updatePayment(@Param('id') id: number, @Body() updatePaymentDto: UpdatePaymentDto) {
      return this.paymentService.updatePayment(id, updatePaymentDto);
  }

  @Delete(':id') 
  async deletePayment(@Param('id') id: number) {
      return this.paymentService.deletePayment(id)
  }
}
