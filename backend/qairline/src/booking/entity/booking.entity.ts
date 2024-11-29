import { Flight } from "src/flight/entity/flight.entity";
import { Promotion } from "src/promotion/entity/promotion.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.bookings, { eager: true })
  	@JoinColumn({ name: "userId" })
    user: User; // Relation to User entity
  
	@ManyToOne(() => Flight, (flight) => flight.bookings, { eager: true })
	@JoinColumn({ name: "flightId" })
    flight: Flight; // Relation to Flight entity
  
    @Column({ type: "varchar", length: 255 })
    passengerName: string;
  
    @Column({ type: "date" })
    passengerDob: Date;
  
    @Column({ type: "varchar", length: 50 })
    passportNumber: string;
  
    @Column({ type: "varchar", length: 50 })
    ticketCode: string;

	@OneToOne(() => Promotion, (promotion) => promotion.booking)
	@JoinColumn({name: "bookingId"})
	promotion: Promotion

    @Column({ type: "jsonb"})
    ticketPrice: Record<string, number>;
  
    @Column({ type: "varchar", length: 10 })
    seatNumber: string; // Số ghế đã đặt (ví dụ: A1, B2)
  
    @Column({ type: "varchar", length: 50 })
    seatClass: string; // Loại hạng ghế (Economy, Business, First Class)

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    bookingDate: Date;
  
    @Column({
      type: "enum",
      enum: ["Confirmed", "Pending", "Cancelled"],
      default: "Confirmed",
    })
    bookingStatus: "Confirmed" | "Pending" | "Cancelled";

	@Column({
		type: "enum",
		enum: ["Paid", "Pending", "Unpaid"],
		default: "Paid",
	})
	paymentStatus: "Paid" | "Pending" | "Unpaid";

    @Column({ type: "timestamp", nullable: true })
    paymentDate: Date;

	@Column({ type: "timestamp", nullable: true })
    cancelDate: Date;

	// @ManyToOne(() => Payment, (payment) => payment.bookings, { eager: true, nullable: true })
	// @JoinColumn({ name: "payment_id" })
	// payment: Payment; // Thông tin thanh toán (nếu có)
}
