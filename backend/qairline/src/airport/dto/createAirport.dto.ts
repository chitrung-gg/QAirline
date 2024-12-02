import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Flight } from "src/flight/entity/flight.entity";

export class CreateAirportDto {
    @IsNumber()
    id: number

    @IsString()
    name: string; // Name of the airport
  
    @IsString()
    city: string; // City where the airport is located
  
    @IsString()
    country: string; // Country where the airport is located
  
    @IsString()
    iataCode: string; // IATA code (e.g., "JFK")
  
    @IsOptional()
    @IsArray()
    departures?: Flight[]; // Flights departing from this airport
  
    @IsOptional()
    @IsArray()
    arrivals?: Flight[]; // Flights arriving at this airport
}
