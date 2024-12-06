import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('booking')
@UseInterceptors(CacheInterceptor)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Post('cancel')
  async cancelBooking(@Body('bookingCode') bookingCode: string) {
    return this.bookingService.cancelBooking(bookingCode)
  }

  @Get('code')
  async getBookingByBookingCode(@Query('bookingCode') bookingCode: string) {
    return this.bookingService.getBookingByBookingCode(bookingCode)
  }

  @Get()
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Get(':id')
  getBookingById(@Param('id') id: number) {
    return this.bookingService.getBookingById(id);
  }

  @Patch(':id')
  async updateBooking(@Param('id') id: number, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: number) {
    return this.bookingService.deleteBooking(id);
  }
}
