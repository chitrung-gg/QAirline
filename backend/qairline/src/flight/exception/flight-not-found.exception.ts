import { HttpException, HttpStatus } from '@nestjs/common';
 
export class FlightNotFoundException extends HttpException {
  constructor(flightId: number) {
    super(`Post with id ${flightId} not found`, HttpStatus.NOT_FOUND);
  }
}