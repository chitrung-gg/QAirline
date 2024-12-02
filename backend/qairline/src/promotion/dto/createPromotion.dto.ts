import { IsArray, IsBoolean, IsIn, IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";

export class CreatePromotionDto {
    @IsNumber()
    id: number; // Primary Key

    @IsString()
    code: string; // Unique promotion code (e.g., "SUMMER2024")

    @IsString()
    description: string; // Description of the promotion (e.g., "20% off on selected flights")

    @IsISO8601()
    startDate: string; // Start date for the promotion (ISO date format)

    @IsISO8601()
    endDate: string; // End date for the promotion (ISO date format)

    @IsNumber()
    discount: number; // Discount value (could be a percentage or a fixed amount)

    @IsString()
    @IsIn(["Percentage", "FixedAmount"])
    discountType: "Percentage" | "FixedAmount"; // Type of discount (Percentage or FixedAmount)

    @IsOptional()
    @IsArray()
    bookings?: Booking[]; // List of bookings that have applied this promotion

    @IsBoolean()
    isActive: boolean; // Whether the promotion is active or not
}
