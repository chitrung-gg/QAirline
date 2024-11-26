import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateFlightDto {
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    airline?: string

    @IsOptional()
    @IsString()
    flightNumber?: string

    @IsOptional()
    @IsString()
    departureAirport?: string;
    
    @IsOptional()
    @IsString()
    arrivalAirport?: string;
    
    @IsOptional()
    @IsDate()
    departureTime?: Date
    
    @IsOptional()
    @IsDate()
    arrivalTime?: Date
    
    @IsOptional()
    @IsNumber()
    availableSeats?: number

    @IsOptional()
    @IsString()
    status?: string = "Available"
}