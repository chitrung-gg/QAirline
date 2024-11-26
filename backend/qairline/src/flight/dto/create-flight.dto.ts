import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFlightDto {
   @IsString()
   flightNumber: string

   @IsString()
   airline: string

   @IsString()
   departureAirport: string;
   
   @IsString()
   arrivalAirport: string;

   @IsDate()
   departureTime: Date
   
   @IsDate()
   arrivalTime: Date

   @IsOptional()
   @IsString()
   status?: string = "Available"

   @IsNumber()
   availableSeats: number
}