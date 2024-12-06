import { Transform } from "class-transformer";
import { IsBoolean, IsISO8601, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class SearchFlightDto {
    @Transform(({ value }) => value === 'true', { toClassOnly: true })
    @IsBoolean()
    isRoundTrip: boolean

    @IsString()
    departureCity: string

    @IsString()
    arrivalCity: string

    @IsISO8601()
    departureDate: string

    @ValidateIf((o) => o.isRoundTrip === true)
    // @IsOptional()
    @IsISO8601()
    returnDate: string

    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @IsNumber()
    passengerCount: number;  // Number of passenger
}