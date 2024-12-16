import { Transform } from "class-transformer";
import { IsBoolean, IsISO8601, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SearchFlightDto {
    // @ApiProperty({ description: 'Indicates if the flight is a round trip', example: true })
    // @Transform(({ value }) => value === 'true', { toClassOnly: true })
    // @IsBoolean()
    // isRoundTrip: boolean

    @ApiProperty({ description: 'City of departure', example: 'New York' })
    @IsString()
    departureCity: string

    @ApiProperty({ description: 'City of arrival', example: 'Los Angeles' })
    @IsString()
    arrivalCity: string

    @ApiProperty({ description: 'Date of departure', example: '2023-01-01T00:00:00Z' })
    @IsISO8601()
    departureDate: string

    // @ApiProperty({ description: 'Date of return (required if isRoundTrip is true)', example: '2023-01-10T00:00:00Z', required: false })
    // @ValidateIf((o) => o.isRoundTrip === true)
    // @IsISO8601()
    // returnDate: string

    @ApiProperty({ description: 'Number of passengers', example: 2 })
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @IsNumber()
    passengerCount: number;  // Number of passengers
}