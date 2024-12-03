import { IsArray, IsDate, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Aircraft } from "src/aircraft/entity/aircraft.entity";
import { Airport } from "src/airport/entity/airport.entity";
import { Booking } from "src/booking/entity/booking.entity";
import { CreateFlightDto } from "./createFlight.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
    // @IsNumber()
    // id: number

    // @IsString()
    // flightNumber?: string
 
    // @IsObject()
    // aircraft?: Aircraft
 
    // @IsObject()
    // departureAirport?: Airport;
    
    // @IsObject()
    // arrivalAirport?: Airport;
 
    // @IsOptional()
    // @IsISO8601()
    // departureTime: string
    
    // @IsOptional()
    // @IsISO8601()
    // arrivalTime: string
 
    // @IsOptional()
    // @IsString()
    // status?: "Scheduled" | "Arrived" | "Delayed" | "Cancelled"
 
    // @IsOptional()
    // @IsNumber()
    // availableSeats?: number

    // @IsOptional()
    // @IsObject()
    // seatClasses?: Record<string, number>
    
    // @IsOptional()
    // @IsArray()
    // bookings?: Booking[]
 
    // @IsOptional()
    // @IsNumber()
    // duration?: number
}