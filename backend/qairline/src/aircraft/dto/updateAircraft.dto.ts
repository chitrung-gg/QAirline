import { IsArray, IsDate, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Flight } from "src/flight/entity/flight.entity";
import { CreateAircraftDto } from "./createAircraft.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateAircraftDto extends PartialType(CreateAircraftDto) {
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
    @IsISO8601()
    createdAt?: string; 

    @IsOptional()
    @IsISO8601()
    updatedAt?: string;

    @IsOptional()
    @IsArray()
    flights?: Flight[]
}