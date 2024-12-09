import { IsArray, IsDate, IsIn, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Aircraft } from "src/aircraft/entity/aircraft.entity";
import { Airport } from "src/airport/entity/airport.entity";
import { Booking } from "src/booking/entity/booking.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFlightDto {
   @ApiProperty({ description: 'Unique flight number', example: 'AA123' })
   @IsString()
   flightNumber: string

   @ApiProperty({ description: 'Aircraft assigned to this flight', type: () => Aircraft, required: false })
   @IsOptional()
   @IsObject()
   aircraft?: Aircraft

   @ApiProperty({ description: 'Airport where the flight departs from', type: () => Airport, required: false })
   @IsOptional()
   @IsObject()
   departureAirport?: Airport;
   
   @ApiProperty({ description: 'Airport where the flight arrives at', type: () => Airport, required: false })
   @IsOptional()
   @IsObject()
   arrivalAirport?: Airport;

   @ApiProperty({ description: 'Time of departure', example: '2023-01-01T10:00:00Z' })
   @IsISO8601()
   departureTime: string
   
   @ApiProperty({ description: 'Time of arrival', example: '2023-01-01T14:00:00Z' })
   @IsISO8601()
   arrivalTime: string

   @ApiProperty({ description: 'Current status of the flight', enum: ["Scheduled", "Arrived", "Delayed", "Cancelled"], required: false })
   @IsOptional()
   @IsString()
   @IsIn([ "Scheduled", "Arrived", "Delayed", "Cancelled"])
   status?: "Scheduled" | "Arrived" | "Delayed" | "Cancelled"

   @ApiProperty({ description: 'Number of available seats for the flight', example: 150 })
   @IsNumber()
   availableSeats: number

   @ApiProperty({ description: 'JSON configuration for seat classes', type: Object })
   @IsObject()
   seatClasses: Record<string, number>
   
   @ApiProperty({ description: 'Bookings associated with the flight', type: () => [Booking], required: false })
   @IsOptional()
   @IsArray()
   bookings?: Booking[]

   @ApiProperty({ description: 'Flight duration in hours (calculated from departureTime and arrivalTime)', example: 4, required: false })
   @IsOptional()
   @IsNumber()
   duration?: number

   @ApiProperty({ description: 'Base price for each seat class', type: Object, required: false })
   @IsOptional()
   @IsObject()
   baseClassPrice?: Record<string, number>
}