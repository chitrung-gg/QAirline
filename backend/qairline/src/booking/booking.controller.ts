import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import RequestWithUser from 'src/authentication/interface/requestWithUser.interface';
import { JwtAuthenticationGuard } from 'src/authentication/guard/jwtAuthentication.guard';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
@UseInterceptors(CacheInterceptor)
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: () => CreateBookingDto })
  @ApiResponse({ status: 201, description: 'The booking has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async createBooking(@Body() createBookingDto: CreateBookingDto, @Req() req: RequestWithUser) {
    const token = req.headers['authorization']?.split(' ')[1];

    let user: { 
      id?: string, 
      username?: string, 
      email?: string }
    
    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_TOKEN_SECRET});
        user = {
          id: decodedToken?.id,
          username: decodedToken?.username,
          email: decodedToken?.email
        }
      } catch (error) {
        console.log('Invalid or expired token', error);
      }
    }

    return this.bookingService.createBooking(createBookingDto, user);
  }

  @Post('link')
  @ApiOperation({ summary: 'Link a user to a booking' })
  @ApiBody({ description: 'Booking ID and User ID', schema: { properties: { bookingId: { type: 'number' }, userId: { type: 'number' } } } })
  @ApiResponse({ status: 200, description: 'User linked to booking successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async addUserToBooking(@Body('bookingId') bookingId: number, @Body('userId') userId: number) {
    return this.bookingService.addUserToBooking(bookingId, userId)
  }

  @Post('cancel')
  @ApiOperation({ summary: 'Cancel a booking' })
  @ApiBody({ description: 'Booking code', schema: { properties: { bookingCode: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Booking cancelled successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async cancelBooking(@Body('bookingCode') bookingCode: string) {
    return this.bookingService.cancelBooking(bookingCode)
  }

  @Get('code')
  @ApiOperation({ summary: 'Get booking by booking code' })
  @ApiParam({ name: 'bookingCode', description: 'Booking code', example: 'ABC123' })
  @ApiResponse({ status: 200, description: 'Return the booking with the specified booking code.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async getBookingByBookingCode(@Query('bookingCode') bookingCode: string) {
    return this.bookingService.getBookingByBookingCode(bookingCode)
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'Return all bookings.' })
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiParam({ name: 'id', description: 'ID of the booking', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the booking with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  getBookingById(@Param('id') id: number) {
    return this.bookingService.getBookingById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update booking by ID' })
  @ApiParam({ name: 'id', description: 'ID of the booking', example: 1 })
  @ApiBody({ type: () => UpdateBookingDto })
  @ApiResponse({ status: 200, description: 'The booking has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async updateBooking(@Param('id') id: number, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete booking by ID' })
  @ApiParam({ name: 'id', description: 'ID of the booking', example: 1 })
  @ApiResponse({ status: 200, description: 'The booking has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async deleteBooking(@Param('id') id: number) {
    return this.bookingService.deleteBooking(id);
  }
}
