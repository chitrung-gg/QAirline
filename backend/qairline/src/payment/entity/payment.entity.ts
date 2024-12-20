import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/booking/entity/booking.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Booking associated with the payment', type: () => Booking })
    @Index('bookingIndex')
    @ManyToOne(() => Booking, (booking) => booking.payments, { eager: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: "bookingId" })
    booking?: Booking; // Link to the associated booking

    @ApiProperty({ description: 'Amount of the payment', example: 100 })
    @Column({ type: "float" })
    amount: number; // Amount paid

    @ApiProperty({ description: 'Status of the payment', enum: ["Paid", "Refunded", "Failed", "Pending"], example: 'Paid' })
    @Column({ type: "enum", enum: ["Paid", "Refunded", "Failed", "Pending"] })
    paymentStatus: "Paid" | "Refunded" | "Failed" | "Pending"; // Payment status

    @ApiProperty({ description: 'Method of the payment', example: 'Credit Card' })
    @Column({ type: "varchar", length: 50 })
    paymentMethod: string; // Payment method (e.g., Credit Card, PayPal, Bank Transfer)

    @ApiProperty({ description: 'Transaction ID of the payment', example: 'txn_1234567890', nullable: true })
    @Column({ type: "varchar", length: 100, nullable: true })
    transactionId: string; // Transaction ID from the payment gateway (if applicable)

    @ApiProperty({ description: 'Date of the payment', example: '2023-01-01T00:00:00Z' })
    @Column({
        type: 'timestamp',
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

    @ApiProperty({ description: 'Indicates if the payment is refunded', example: false })
    @Column({ type: "boolean", default: false })
    isRefunded?: boolean; // Flag to check if the payment has been refunded

    @ApiProperty({ description: 'Amount refunded (if any)', example: 50, nullable: true })
    @Column({ type: "float", nullable: true })
    refundAmount?: number; // Amount refunded (if any)

    @ApiProperty({ description: 'Date the refund was processed (if any)', example: '2023-01-02T00:00:00Z', nullable: true })
    @Column({
      type: 'timestamp', nullable: true,
      transformer: {
        to: (value: string | Date | null) => {
          if (value === null) return null;
          return new Date(value).toISOString();
        },
        from: (value: Date) => {
          return value ? value.toISOString() : null;
        },
      }
    })
    refundDate?: string; // Date the refund was processed (if any)
}
