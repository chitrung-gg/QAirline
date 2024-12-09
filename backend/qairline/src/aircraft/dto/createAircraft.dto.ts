import { IsArray, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Flight } from "src/flight/entity/flight.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAircraftDto {
    @ApiProperty({ description: 'Aircraft code', example: 'A320' })
    @IsString()
    aircraftCode: string

    @ApiProperty({ description: 'Model of the aircraft', example: 'Airbus A320' })
    @IsString()
    model: string;

    @ApiProperty({ description: 'Manufacturer of the aircraft', example: 'Airbus' })
    @IsString()
    manufacturer: string; 

    @ApiProperty({ description: 'Capacity of the aircraft', example: 180 })
    @IsNumber()
    capacity: number; 

    @ApiProperty({ description: 'Seat classes configuration', example: { economy: 150, business: 30 } })
    @IsObject()
    seatClasses: Record<string, number>

    @ApiProperty({ description: 'Status of the aircraft', example: 'Active', required: false })
    @IsOptional()
    @IsString()
    status?: "Active" | "Maintenance" | "Retired"; 
  
    @ApiProperty({ description: 'Creation date of the aircraft record', example: '2023-01-01T00:00:00Z' })
    @IsISO8601()
    createdAt: string; 

    @ApiProperty({ description: 'Last update date of the aircraft record', example: '2023-01-01T00:00:00Z' })
    @IsISO8601()
    updatedAt: string; 

    @ApiProperty({ description: 'List of flights associated with the aircraft', type: () => Flight, required: false })
    @IsOptional()
    @IsArray()
    flights?: Flight[]
}