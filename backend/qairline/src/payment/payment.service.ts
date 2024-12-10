import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { UpdatePaymentDto } from './dto/updatePayment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entity/payment.entity';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class PaymentService {
  constructor(
      @InjectRepository(Payment)
      private paymentRepository: Repository<Payment>,
      @Inject(CACHE_MANAGER)
      private cacheManager: Cache
  ) {}

  async createPayment(payment: CreatePaymentDto) {
    await this.cacheManager.reset()
    if (payment.paymentDate >= payment.refundDate) {
        throw new HttpException('Please recheck paymentDate and refundDate', HttpStatus.NOT_ACCEPTABLE);
    }
      const newPayment = await this.paymentRepository.create(payment)
      await this.paymentRepository.save(newPayment)
      return newPayment
  }

  async getAllPayments() {
      return this.paymentRepository.find()
  }

  async getPaymentById(id: number) {
      const payment = this.paymentRepository.findOne({
          where: {
              id: id
          }
      })
      if (payment) {
          return payment
      }
      throw new HttpException('Exception found in PaymentService: getPaymentById', HttpStatus.BAD_REQUEST)
  }

  async updatePayment(id: number, payment: UpdatePaymentDto) {
    await this.cacheManager.reset()
    try {
        await this.getPaymentById(id)
        if (payment.paymentDate >= payment.refundDate) {
            throw new HttpException('Please recheck paymentDate and refundDate', HttpStatus.NOT_ACCEPTABLE);
        }
        await this.paymentRepository.update(id, payment)
    } catch (error) {
        throw new HttpException('Exception found in PaymentService: updatePayment', HttpStatus.BAD_REQUEST)
    }
  }

  async deletePayment(id: number) {
    await this.cacheManager.reset()
      const deletePaymentResponse = await this.paymentRepository.delete(id)
      if (!deletePaymentResponse.affected) {
          throw new HttpException('Exception found in PaymentService: deletePayment', HttpStatus.BAD_REQUEST)
      }
  }
}
