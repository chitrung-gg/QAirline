import { IsArray, IsDate, IsEmail, IsIn, IsISO8601, IsJSON, IsObject, IsOptional, IsString } from "class-validator";
import { Flight } from "src/flight/entity/flight.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { Promotion } from "src/promotion/entity/promotion.entity";
import { User } from "src/user/entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto {
    @ApiProperty({ description: 'User associated with the booking', type: () => User, required: false })
    @IsObject()
    @IsOptional()
    user?: User; // Relation to User entity
  
    @ApiProperty({ description: 'Flight associated with the booking', type: () => Flight, required: false })
    @IsOptional()
    @IsObject()
    flight?: Flight; // Relation to Flight entity
  
    @ApiProperty({ description: 'Name of the passenger', example: 'John Doe' })
    @IsString()
    passengerName: string;
  
    @ApiProperty({ description: 'Email of the passenger', example: 'john.doe@example.com' })
    @IsEmail()
    passengerEmail: string

    @ApiProperty({ description: 'Date of birth of the passenger', example: '1990-01-01T00:00:00Z' })
    @IsISO8601()
    passengerDob: string;
  
    @ApiProperty({ description: 'Passport number of the passenger', example: 'A12345678' })
    @IsString()
    passportNumber: string;
  
    @ApiProperty({ description: 'Booking code', example: 'ABC123', required: false })
    @IsString()
    @IsOptional()
    bookingCode?: string;

    @ApiProperty({ description: 'Promotion applied to the booking', type: () => Promotion, required: false })
    @IsObject()
    @IsOptional()
    promotion?: Promotion

    @ApiProperty({ description: 'Ticket price details', type: Object, required: false })
    @IsOptional()
    @IsObject()
    ticketPrice?: Record<string, number>;
  
    @ApiProperty({ description: 'Seat number assigned to the passenger', example: 'A1' })
    @IsString()
    seatNumber: string; 
  
    @ApiProperty({ description: 'Seat class assigned to the passenger', example: 'Economy' })
    @IsString()
    seatClass: string; 

    @ApiProperty({ description: 'Booking date', example: '2023-01-01T00:00:00Z' })
    @IsISO8601()
    bookingDate: string;
  
    @ApiProperty({ description: 'Booking status', enum: ["Confirmed", "Pending", "Cancelled"] })
    @IsString()
    @IsIn(["Confirmed", "Pending", "Cancelled"])
    bookingStatus: "Confirmed" | "Pending" | "Cancelled";

    @ApiProperty({ description: 'Payment status', enum: ["Paid", "Pending", "Unpaid"] })
    @IsString()
    @IsIn(["Paid", "Pending", "Unpaid"])
    paymentStatus: "Paid" | "Pending" | "Unpaid";

    @ApiProperty({ description: 'Payments associated with the booking', type: () => [Payment], required: false })
    @IsOptional()
    @IsArray()
    payments?: Payment[]
}
