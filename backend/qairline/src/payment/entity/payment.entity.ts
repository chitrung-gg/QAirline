import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/booking/entity/booking.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Index('bookingIndex')
    @ManyToOne(() => Booking, (booking) => booking.payments, {eager: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinColumn({name: "bookingId"})
    booking?: Booking; // Link to the associated booking

    @ApiProperty()
    @Column({ type: "float" })
    amount: number; // Amount paid

    @ApiProperty()
    @Column({ type: "enum", enum: ["Paid", "Refunded", "Failed", "Pending"] })
    paymentStatus: "Paid" | "Refunded" | "Failed" | "Pending"; // Payment status

    @ApiProperty()
    @Column({ type: "varchar", length: 50 })
    paymentMethod: string; // Payment method (e.g., Credit Card, PayPal, Bank Transfer)

    @ApiProperty()
    @Column({ type: "varchar", length: 100, nullable: true })
    transactionId: string; // Transaction ID from the payment gateway (if applicable)

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
    paymentDate: string; // Date of the payment

    @ApiProperty()
    @Column({ type: "boolean", default: false })
    isRefunded?: boolean; // Flag to check if the payment has been refunded

    @ApiProperty()
    @Column({ type: "float", nullable: true })
    refundAmount?: number; // Amount refunded (if any)

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
      }})
    refundDate?: string; // Date the refund was processed (if any)
}
