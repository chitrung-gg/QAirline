import { IsArray, IsDate, IsEmail, IsIn, IsISO8601, IsJSON, IsObject, IsOptional, IsString } from "class-validator";
import { Flight } from "src/flight/entity/flight.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { Promotion } from "src/promotion/entity/promotion.entity";
import { User } from "src/user/entity/user.entity";

export class CreateBookingDto {
    @IsObject()
    @IsOptional()
    user?: User; // Relation to User entity
  
    @IsOptional()
	@IsObject()
    flight?: Flight; // Relation to Flight entity
  
    @IsString()
    passengerName: string;
  
    @IsEmail()
    passengerEmail: string

    @IsISO8601()
    passengerDob: string;
  
    @IsString()
    passportNumber: string;
  
    @IsString()
    @IsOptional()
    bookingCode?: string;

	@IsObject()
    @IsOptional()
	promotion?: Promotion

    @IsObject()
    ticketPrice: Record<string, number>;
  
    @IsString()
    seatNumber: string; 
  
    @IsString()
    seatClass: string; 

    @IsISO8601()
    bookingDate: string;
  
    @IsString()
    @IsIn(["Confirmed", "Pending", "Cancelled"])
    bookingStatus: "Confirmed" | "Pending" | "Cancelled";

	@IsString()
    @IsIn(["Paid", "Pending", "Unpaid"])
	paymentStatus: "Paid" | "Pending" | "Unpaid";

    @IsOptional()
    @IsArray()
    payments?: Payment[]
}
