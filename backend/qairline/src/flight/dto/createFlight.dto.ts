import { IsDate, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Aircraft } from "src/aircraft/entity/aircraft.entity";
import { Airport } from "src/airport/entity/airport.entity";
import { Booking } from "src/booking/entity/booking.entity";

export class CreateFlightDto {
   @IsString()
   flightNumber: string

   @IsObject()
   aircraft: Aircraft

   @IsObject()
   departureAirport: Airport;
   
   @IsObject()
   arrivalAirport: Airport;

   @IsDate()
   departureTime: Date
   
   @IsDate()
   arrivalTime: Date

   @IsOptional()
   @IsString()
   status?: "Scheduled" | "Arrived" | "Delayed" | "Cancelled"

   @IsNumber()
   availableSeats: number

   @IsOptional()
   @IsObject()
   bookings?: Booking[]

   @IsOptional()
   @IsNumber()
   duration?: number
}