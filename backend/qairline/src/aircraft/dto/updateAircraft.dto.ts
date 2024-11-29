import { IsArray, IsDate, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Flight } from "src/flight/entity/flight.entity";

export class UpdateAircraftDto {
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    aircraftCode?: string

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsString()
    manufacturer?: string; 

    @IsOptional()
    @IsNumber()
    capacity?: number; 

    @IsOptional()
    @IsObject()
    seatClasses?: Record<string, number>

    @IsOptional()
    @IsString()
    status?: "Active" | "Maintenance" | "Retired"; 
    
    @IsOptional()
    @IsDate()
    createdAt?: Date; 

    @IsOptional()
    @IsDate()
    updatedAt?: Date; 

    @IsOptional()
    @IsArray()
    flights?: Flight[]
}