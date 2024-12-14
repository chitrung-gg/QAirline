import { IsArray, IsBoolean, IsIn, IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePromotionDto {
    @ApiProperty({ description: 'Unique promotion code', example: 'SUMMER2024' })
    @IsString()
    code: string; // Unique promotion code (e.g., "SUMMER2024")

    @ApiProperty({ description: 'Description of the promotion', example: '20% off on selected flights' })
    @IsString()
    description: string; // Description of the promotion (e.g., "20% off on selected flights")

    @ApiProperty({ description: 'Cover image URL of the news article', example: 'http://example.com/image.jpg', nullable: true })
    @IsString()
    coverImage?: string; // Đường dẫn ảnh bìa (nếu có)

    @ApiProperty({ description: 'Start date for the promotion', example: '2023-06-01T00:00:00Z' })
    @IsISO8601()
    startDate: string; // Start date for the promotion (ISO date format)

    @ApiProperty({ description: 'End date for the promotion', example: '2023-08-31T23:59:59Z' })
    @IsISO8601()
    endDate: string; // End date for the promotion (ISO date format)

    @ApiProperty({ description: 'Discount value', example: 20 })
    @IsNumber()
    discount: number; // Discount value (could be a percentage or a fixed amount)

    @ApiProperty({ description: 'Type of discount', enum: ["Percentage", "FixedAmount"], example: 'Percentage' })
    @IsString()
    @IsIn(["Percentage", "FixedAmount"])
    discountType: "Percentage" | "FixedAmount"; // Type of discount (Percentage or FixedAmount)

    @ApiProperty({ description: 'List of bookings that have applied this promotion', type: () => [Booking], required: false })
    @IsOptional()
    @IsArray()
    bookings?: Booking[]; // List of bookings that have applied this promotion

    @ApiProperty({ description: 'Whether the promotion is active or not', example: true })
    @IsBoolean()
    isActive: boolean; // Whether the promotion is active or not
}
