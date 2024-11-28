import { Flight } from "src/flight/entity/flight.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    booking_id: number;
  
    @ManyToOne(() => User, (user) => user.booking, { nullable: false })
    user: User; // Relation to User entity
  
    @ManyToOne(() => Flight, (flight) => flight.bookings, { nullable: false })
    flight: Flight; // Relation to Flight entity
  
    @Column({ type: "varchar", length: 255 })
    passenger_name: string;
  
    @Column({ type: "date" })
    passenger_dob: Date;
  
    @Column({ type: "varchar", length: 50 })
    passport_number: string;
  
    @Column({ type: "varchar", length: 50 })
    ticket_code: string;
  
    @Column({ type: "decimal", precision: 10, scale: 2 })
    ticket_price: number;
  
    @Column({ type: "int" })
    seat_number: number;
  
    @Column({ type: "varchar", length: 50 })
    seat_class: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    booking_date: Date;
  
    @Column({
      type: "enum",
      enum: ["Purchased", "Waiting", "Cancelled"],
      default: "Waiting",
    })
    booking_status: "Purchased" | "Waiting" | "Cancelled";
  
    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_amount: number;
  
    @Column({ type: "varchar", length: 50, nullable: true })
    promo_code: string;
  
    @Column({ type: "timestamp", nullable: true })
    payment_date: Date;
}
