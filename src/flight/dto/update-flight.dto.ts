import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFlightDto {
    @IsOptional()
    @IsString()
    flightNumber?: string

    @IsOptional()
    @IsNumber()
    departureAirportId?: number;
    
    @IsOptional()
    @IsNumber()
    arrivalAirportId?: number;
    
    @IsOptional()
    @IsDate()
    departureTime?: Date
    
    @IsOptional()
    @IsDate()
    arrivalTime?: Date
    
    @IsOptional()
    @IsNumber()
    availableSeats?: number
}