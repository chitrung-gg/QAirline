import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/booking/entity/booking.entity";
import { Flight } from "src/flight/entity/flight.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Promotion {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number; // Primary Key

    @ApiProperty()
    @Column({ type: "varchar", length: 50, unique: true })
    code: string; // Unique promotion code (e.g., "SUMMER2024")

    @ApiProperty()
    @Column({ type: "text" })
    description: string; // Description of the promotion (e.g., "20% off on selected flights")

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
    startDate: string; // Start date for the promotion (ISO date format)

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
    endDate: string; // End date for the promotion (ISO date format)

    @ApiProperty()
    @Column({ type: "integer" })
    discount: number; // Discount value (could be a percentage or a fixed amount)

    @ApiProperty()
    @Column({ type: "enum", enum: ["Percentage", "FixedAmount"] })
    discountType: "Percentage" | "FixedAmount"; // Type of discount (Percentage or FixedAmount)

    @ApiProperty()
    @OneToMany(() => Booking, (booking) => booking.promotion)
    bookings?: Booking[]; // List of bookings that have applied this promotion

    @ApiProperty()
    @Column({ type: "boolean", default: true })
    isActive: boolean; // Whether the promotion is active or not
}
