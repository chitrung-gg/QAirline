import { IsBoolean, IsIn, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
    @ApiProperty({ description: 'Booking associated with the payment', type: () => Booking, required: false })
    @IsOptional()
    @IsObject()
    booking?: Booking;

    @ApiProperty({ description: 'Amount of the payment', example: 100 })
    @IsNumber()
    amount: number; 

    @ApiProperty({ description: 'Status of the payment', enum: ["Paid", "Refunded", "Failed", "Pending"], example: 'Paid' })
    @IsString()
    @IsIn(["Paid", "Refunded", "Failed", "Pending"])
    paymentStatus: "Paid" | "Refunded" | "Failed" | "Pending"; 

    @ApiProperty({ description: 'Method of the payment', example: 'Credit Card' })
    @IsString()
    paymentMethod: string;

    @ApiProperty({ description: 'Transaction ID of the payment', example: 'txn_1234567890' })
    @IsString()
    transactionId: string;

    @ApiProperty({ description: 'Date of the payment', example: '2023-01-01T00:00:00Z' })
    @IsISO8601()
    paymentDate: string;

    @ApiProperty({ description: 'Indicates if the payment is refunded', example: false, required: false })
    @IsBoolean()
    @IsOptional()
    isRefunded?: boolean;

    @ApiProperty({ description: 'Amount refunded (if any)', example: 50, required: false })
    @IsNumber()
    @IsOptional()
    refundAmount?: number; // Amount refunded (if any)

    @ApiProperty({ description: 'Date the refund was processed (if any)', example: '2023-01-02T00:00:00Z', required: false })
    @IsISO8601()
    @IsOptional()
    refundDate?: string; // Date the refund was processed (if any)
}
