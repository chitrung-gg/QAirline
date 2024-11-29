import { IsArray, IsDate, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
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
  
    @IsDate()
    createdAt: Date; 

    @IsDate()
    updatedAt: Date; 

    @IsOptional()
    @IsArray()
    flights?: Flight[]
}