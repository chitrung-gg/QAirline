import { ApiProperty } from "@nestjs/swagger";
import { Flight } from "src/flight/entity/flight.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { Promotion } from "src/promotion/entity/promotion.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ description: 'User associated with the booking', type: () => User, nullable: true })
    @Index('userIndex')
    @ManyToOne(() => User, { eager: true, nullable: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user?: User; // Relation to User entity
  
    @ApiProperty({ description: 'Flight associated with the booking', type: () => Flight, nullable: true })
    @Index('flightIndex')
    @ManyToOne(() => Flight, { eager: true, nullable: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "flightId" })
    flight?: Flight; // Relation to Flight entity
  
    @ApiProperty({ description: 'Name of the passenger', example: 'John Doe' })
    @Column({ type: "varchar", length: 255 })
    passengerName: string;
  
    @ApiProperty({ description: 'Email of the passenger', example: 'john.doe@example.com' })
    @Column({ type: "varchar", unique: true, length: 100 })
    passengerEmail: string; 

    @ApiProperty({ description: 'Date of birth of the passenger', example: '1990-01-01T00:00:00Z' })
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
  
    @ApiProperty({ description: 'Passport number of the passenger', example: 'A12345678' })
    @Column({ type: "varchar", length: 50 })
    passportNumber: string;
  
    @ApiProperty({ description: 'Booking code', example: 'ABC123', nullable: true })
    @Column({ type: "varchar", length: 50, nullable: true })
    bookingCode?: string;

    @ApiProperty({ description: 'Promotion applied to the booking', type: () => Promotion, nullable: true })
    @Index('promotionIndex')
    @ManyToOne(() => Promotion, { eager: true, cascade: true, nullable: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "promotionId" })
    promotion?: Promotion;

    @ApiProperty({ description: 'Ticket price details', type: () => Object })
    @Column({ type: "jsonb" })
    ticketPrice?: Record<string, number>;
  
    @ApiProperty({ description: 'Seat number assigned to the passenger', example: 'A1' })
    @Column({ type: "varchar", length: 10 })
    seatNumber: string; // Số ghế đã đặt (ví dụ: A1, B2)
  
    @ApiProperty({ description: 'Seat class assigned to the passenger', example: 'Economy' })
    @Column({ type: "varchar", length: 50 })
    seatClass: string; // Loại hạng ghế (Economy, Business, First Class)

    @ApiProperty({ description: 'Booking date', example: '2023-01-01T00:00:00Z' })
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
  
    @ApiProperty({ description: 'Booking status', enum: ['Confirmed', 'Pending', 'Cancelled'], default: 'Pending' })
    @Column({
      type: "enum",
      enum: ["Confirmed", "Pending", "Cancelled"],
      default: "Pending",
    })
    bookingStatus?: "Confirmed" | "Pending" | "Cancelled";

    @ApiProperty({ description: 'Payment status', enum: ['Paid', 'Pending', 'Unpaid'], default: 'Pending' })
    @Column({
      type: "enum",
      enum: ["Paid", "Pending", "Unpaid"],
      default: "Pending",
    })
    paymentStatus?: "Paid" | "Pending" | "Unpaid";

    @ApiProperty({ description: 'Payments associated with the booking', type: () => [Payment] })
    @OneToMany(() => Payment, (payment) => payment.booking)
    payments?: Payment[]; // Track multiple payments for the booking
}