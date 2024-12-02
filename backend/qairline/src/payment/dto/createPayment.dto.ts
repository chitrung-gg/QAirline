import { IsBoolean, IsIn, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";

export class CreatePaymentDto {
    @IsOptional()
    @IsObject()
    booking?: Booking;

    @IsNumber()
    amount: number; 

    @IsString()
    @IsIn(["Paid", "Refunded", "Failed", "Pending"])
    paymentStatus: "Paid" | "Refunded" | "Failed" | "Pending"; 

    @IsString()
    paymentMethod: string;

    @IsString()
    transactionId: string;

    @IsISO8601()
    paymentDate: string;

    @IsBoolean()
    @IsOptional()
    isRefunded?: boolean;

    @IsNumber()
    @IsOptional()
    refundAmount?: number; // Amount refunded (if any)

    @IsISO8601()
    @IsOptional()
    refundDate?: string; // Date the refund was processed (if any)
}
