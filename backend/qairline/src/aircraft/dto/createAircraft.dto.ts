import { IsArray, IsDate, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Flight } from "src/flight/entity/flight.entity";

export class CreateAircraftDto {
    @IsString()
    aircraftCode: string

    @IsString()
    model: string;

    @IsString()
    manufacturer: string; 

    @IsNumber()
    capacity: number; 

    @IsObject()
    seatClasses: Record<string, number>

    @IsOptional()
    @IsString()
    status?: "Active" | "Maintenance" | "Retired"; 
  
    @IsISO8601()
    createdAt: string; 

    @IsISO8601()
    updatedAt: string; 

    @IsOptional()
    @IsArray()
    flights?: Flight[]
}