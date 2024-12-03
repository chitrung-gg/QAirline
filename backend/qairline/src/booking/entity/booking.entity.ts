import { Flight } from "src/flight/entity/flight.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { Promotion } from "src/promotion/entity/promotion.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, { eager: true, nullable: true, cascade: true, onUpdate: "CASCADE" })
  	@JoinColumn({ name: "userId" })
    user?: User; // Relation to User entity
  
	@ManyToOne(() => Flight, { eager: true, nullable: true, cascade: true, onUpdate: "CASCADE" })
	@JoinColumn({ name: "flightId" })
    flight?: Flight; // Relation to Flight entity
  
    @Column({ type: "varchar", length: 255 })
    passengerName: string;
  
    @Column({
        type: 'timestamptz',
        transformer: {
          to: (value: string | Date | null) => {
            if (value === null) return null;
            return new Date(value).toISOString();
          },
          from: (value: Date) => {
            return value ? value.toISOString() : null;
          },
        },
      })
    passengerDob: string;
  
    @Column({ type: "varchar", length: 50})
    passportNumber: string;
  
    // TODO: Generate bookingCode
    @Column({ type: "varchar", length: 50, nullable: true })
    bookingCode?: string;

	@ManyToOne(() => Promotion, { eager: true, cascade: true, nullable: true, onUpdate: "CASCADE" })
	@JoinColumn({name: "promotionId"})
	promotion?: Promotion

    @Column({ type: "jsonb"})
    ticketPrice: Record<string, number>;
  
    @Column({ type: "varchar", length: 10 })
    seatNumber: string; // Số ghế đã đặt (ví dụ: A1, B2)
  
    @Column({ type: "varchar", length: 50 })
    seatClass: string; // Loại hạng ghế (Economy, Business, First Class)

    @Column({
        type: 'timestamptz', nullable: true,
        transformer: {
          to: (value: string | Date | null) => {
            if (value === null) return null;
            return new Date(value).toISOString();
          },
          from: (value: Date) => {
            return value ? value.toISOString() : null;
          },
        },
        default: () => "CURRENT_TIMESTAMP"
      })
    bookingDate: string;
  
    @Column({
      type: "enum",
      enum: ["Confirmed", "Pending", "Cancelled"],
      default: "Pending",
    })
    bookingStatus?: "Confirmed" | "Pending" | "Cancelled";

	@Column({
		type: "enum",
		enum: ["Paid", "Pending", "Unpaid"],
		default: "Pending",
	})
	paymentStatus?: "Paid" | "Pending" | "Unpaid";


    @OneToMany(() => Payment, (payment) => payment.booking)
    payments?: Payment[]; // Track multiple payments for the booking
}
