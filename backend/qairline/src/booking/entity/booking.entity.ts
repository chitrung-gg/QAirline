import { ApiProperty } from "@nestjs/swagger";
import { Flight } from "src/flight/entity/flight.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { Promotion } from "src/promotion/entity/promotion.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @Index('userIndex')
    @ManyToOne(() => User, { eager: true, nullable: true, cascade: true, onUpdate: "CASCADE" })
  	@JoinColumn({ name: "userId" })
    user?: User; // Relation to User entity
  
    @ApiProperty()
    @Index('flightIndex')
    @ManyToOne(() => Flight, { eager: true, nullable: true, cascade: true, onUpdate: "CASCADE" })
    @JoinColumn({ name: "flightId" })
    flight?: Flight; // Relation to Flight entity
  
    @ApiProperty()
    @Column({ type: "varchar", length: 255 })
    passengerName: string;
  
    @ApiProperty()
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
  
    @ApiProperty()
    @Column({ type: "varchar", length: 50})
    passportNumber: string;
  
    @ApiProperty()
    // TODO: Generate bookingCode
    @Column({ type: "varchar", length: 50, nullable: true })
    bookingCode?: string;

    @ApiProperty()
    @Index('promotionIndex')
    @ManyToOne(() => Promotion, { eager: true, cascade: true, nullable: true, onUpdate: "CASCADE" })
    @JoinColumn({name: "promotionId"})
    promotion?: Promotion

    @ApiProperty()
    @Column({ type: "jsonb"})
    ticketPrice: Record<string, number>;
  
    @ApiProperty()
    @Column({ type: "varchar", length: 10 })
    seatNumber: string; // Số ghế đã đặt (ví dụ: A1, B2)
  
    @ApiProperty()
    @Column({ type: "varchar", length: 50 })
    seatClass: string; // Loại hạng ghế (Economy, Business, First Class)

    @ApiProperty()
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
  
    @ApiProperty()
    @Column({
      type: "enum",
      enum: ["Confirmed", "Pending", "Cancelled"],
      default: "Pending",
    })
    bookingStatus?: "Confirmed" | "Pending" | "Cancelled";

    @ApiProperty()
    @Column({
      type: "enum",
      enum: ["Paid", "Pending", "Unpaid"],
      default: "Pending",
    })
    paymentStatus?: "Paid" | "Pending" | "Unpaid";

    @ApiProperty()
    @OneToMany(() => Payment, (payment) => payment.booking)
    payments?: Payment[]; // Track multiple payments for the booking
}
