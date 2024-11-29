import { IsDate, IsIn, IsJSON, IsObject, IsString } from "class-validator";
import { Flight } from "src/flight/entity/flight.entity";
import { Promotion } from "src/promotion/entity/promotion.entity";
import { User } from "src/user/entity/user.entity";

export class CreateBookingDto {
    @IsObject()
    user: User; // Relation to User entity
  
	@IsObject()
    flight: Flight; // Relation to Flight entity
  
    @IsString()
    passengerName: string;
  
    @IsDate()
    passengerDob: Date;
  
    @IsString()
    passportNumber: string;
  
    @IsString()
    ticketCode: string;

	@IsObject()
	promotion: Promotion

    @IsJSON()
    ticketPrice: Record<string, number>;
  
    @IsString()
    seatNumber: string; // Số ghế đã đặt (ví dụ: A1, B2)
  
    @IsString()
    seatClass: string; // Loại hạng ghế (Economy, Business, First Class)

    @IsDate()
    bookingDate: Date;
  
    @IsString()
    @IsIn(["Confirmed", "Pending", "Cancelled"])
    bookingStatus: "Confirmed" | "Pending" | "Cancelled";

	@IsString()
    @IsIn(["Paid", "Pending", "Unpaid"])
	paymentStatus: "Paid" | "Pending" | "Unpaid";

    @IsDate()
    paymentDate: Date;

	@IsDate()
    cancelDate: Date;

	// @ManyToOne(() => Payment, (payment) => payment.bookings, { eager: true, nullable: true })
	// @JoinColumn({ name: "payment_id" })
	// payment: Payment; // Thông tin thanh toán (nếu có)
}
