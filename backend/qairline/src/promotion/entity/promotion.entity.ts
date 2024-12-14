import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/booking/entity/booking.entity";
import { Flight } from "src/flight/entity/flight.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Promotion {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number; // Primary Key

    @ApiProperty({ description: 'Unique promotion code', example: 'SUMMER2024' })
    @Column({ type: "varchar", length: 50, unique: true })
    code: string; // Unique promotion code (e.g., "SUMMER2024")

    @ApiProperty({ description: 'Description of the promotion', example: '20% off on selected flights' })
    @Column({ type: "text" })
    description: string; // Description of the promotion (e.g., "20% off on selected flights")

    @ApiProperty({ description: 'Cover image URL of the news article', example: 'http://example.com/image.jpg', nullable: true })
    @Column({ type: "varchar", length: 255, nullable: true })
    coverImage?: string; // Đường dẫn ảnh bìa (nếu có)
    
    @ApiProperty({ description: 'Start date for the promotion', example: '2023-06-01T00:00:00Z' })
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
    startDate: string; // Start date for the promotion (ISO date format)

    @ApiProperty({ description: 'End date for the promotion', example: '2023-08-31T23:59:59Z' })
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
    endDate: string; // End date for the promotion (ISO date format)

    @ApiProperty({ description: 'Discount value', example: 20 })
    @Column({ type: "integer" })
    discount: number; // Discount value (could be a percentage or a fixed amount)

    @ApiProperty({ description: 'Type of discount', enum: ["Percentage", "FixedAmount"], example: 'Percentage' })
    @Column({ type: "enum", enum: ["Percentage", "FixedAmount"] })
    discountType: "Percentage" | "FixedAmount"; // Type of discount (Percentage or FixedAmount)

    @ApiProperty({ description: 'List of bookings that have applied this promotion', type: () => [Booking], required: false })
    @OneToMany(() => Booking, (booking) => booking.promotion)
    bookings?: Booking[]; // List of bookings that have applied this promotion

    @ApiProperty({ description: 'Whether the promotion is active or not', example: true })
    @Column({ type: "boolean", default: true })
    isActive: boolean; // Whether the promotion is active or not
}
