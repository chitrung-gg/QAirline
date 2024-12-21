import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Flight } from "src/flight/entity/flight.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAirportDto {
    @ApiProperty({ description: 'Name of the airport', example: 'John F. Kennedy International Airport' })
    @IsString()
    name: string; // Name of the airport
  
    @ApiProperty({ description: 'City where the airport is located', example: 'New York' })
    @IsString()
    city: string; // City where the airport is located
  
    @ApiProperty({ description: 'Country where the airport is located', example: 'USA' })
    @IsString()
    country: string; // Country where the airport is located
  
    @ApiProperty({ description: 'IATA code of the airport', example: 'JFK' })
    @IsString()
    iataCode: string; // IATA code (e.g., "JFK")
  
    @ApiProperty({ description: 'Flights departing from this airport', type: () => [Flight], required: false })
    @IsOptional()
    @IsArray()
    departures?: Flight[]; // Flights departing from this airport
  
    @ApiProperty({ description: 'Flights arriving at this airport', type: () => [Flight], required: false })
    @IsOptional()
    @IsArray()
    arrivals?: Flight[]; // Flights arriving at this airport
}