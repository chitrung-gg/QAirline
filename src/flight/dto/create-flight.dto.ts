import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateFlightDto {
   @IsString()
   flightNumber: string

   @IsNumber()
   departureAirportId: number;
   
   @IsNumber()
   arrivalAirportId: number;

   @IsDate()
   departureTime: Date
   
   @IsDate()
   arrivalTime: Date

   @IsNumber()
   availableSeats: number
}