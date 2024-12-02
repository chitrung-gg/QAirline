import { Booking } from "src/booking/entity/booking.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Booking, (booking) => booking.payments, {eager: true, cascade: true, onUpdate: "CASCADE"})
    @JoinColumn({name: "bookingId"})
    booking?: Booking; // Link to the associated booking

    @Column({ type: "float" })
    amount: number; // Amount paid

    @Column({ type: "enum", enum: ["Paid", "Refunded", "Failed", "Pending"] })
    paymentStatus: "Paid" | "Refunded" | "Failed" | "Pending"; // Payment status

    @Column({ type: "varchar", length: 50 })
    paymentMethod: string; // Payment method (e.g., Credit Card, PayPal, Bank Transfer)

    @Column({ type: "varchar", length: 100, nullable: true })
    transactionId: string; // Transaction ID from the payment gateway (if applicable)

    @Column({ type: 'timestamptz', transformer: {
        to: (value: string | Date) => new Date(value), // Convert ISO string to Date for database
        from: (value: Date) => value.toISOString(),   // Convert Date to ISO string when retrieving
    } })
    paymentDate: string; // Date of the payment

    @Column({ type: "boolean", default: false })
    isRefunded?: boolean; // Flag to check if the payment has been refunded

    @Column({ type: "float", nullable: true })
    refundAmount?: number; // Amount refunded (if any)

    @Column({ type: 'timestamptz', nullable: true, transformer: {
        to: (value: string | Date) => new Date(value), // Convert ISO string to Date for database
        from: (value: Date) => value.toISOString(),   // Convert Date to ISO string when retrieving
    }})
    refundDate?: string | null = null; // Date the refund was processed (if any)
}
