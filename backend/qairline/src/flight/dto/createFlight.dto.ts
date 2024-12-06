import { IsArray, IsDate, IsIn, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Aircraft } from "src/aircraft/entity/aircraft.entity";
import { Airport } from "src/airport/entity/airport.entity";
import { Booking } from "src/booking/entity/booking.entity";

export class CreateFlightDto {
   @IsString()
   flightNumber: string

   @IsOptional()
   @IsObject()
   aircraft?: Aircraft

   @IsOptional()
   @IsObject()
   departureAirport?: Airport;
   
   @IsOptional()
   @IsObject()
   arrivalAirport?: Airport;

   @IsISO8601()
   departureTime: string
   
   @IsISO8601()
   arrivalTime: string

   @IsOptional()
   @IsString()
   @IsIn([ "Scheduled", "Arrived", "Delayed", "Cancelled"])
   status?: "Scheduled" | "Arrived" | "Delayed" | "Cancelled"

   @IsNumber()
   availableSeats: number

   @IsObject()
   seatClasses: Record<string, number>
   
   @IsOptional()
   @IsArray()
   bookings?: Booking[]

   @IsOptional()
   @IsNumber()
   duration?: number

   @IsObject()
   baseClassPrice?: Record<string, number>
}