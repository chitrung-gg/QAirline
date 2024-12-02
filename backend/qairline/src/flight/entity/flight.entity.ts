import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Airport } from "src/airport/entity/airport.entity";
import { Aircraft } from "src/aircraft/entity/aircraft.entity";
import { Booking } from "src/booking/entity/booking.entity";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number; // Khóa chính

    @Column({ unique: true })
    flightNumber: string; // Số hiệu chuyến bay (duy nhất)

    @ManyToOne(() => Aircraft, (aircraft) => aircraft.flights, { eager: true, cascade: true, onUpdate: "CASCADE"})
    @JoinColumn({ name: "aircraftId" })
    aircraft?: Aircraft; // Liên kết với bảng Aircraft

    @ManyToOne(() => Airport, (airport) => airport.departures, { eager: true, cascade: true, onUpdate: "CASCADE" })
    @JoinColumn({ name: "departureAirportId" })
    departureAirport?: Airport; // Sân bay khởi hành

    @ManyToOne(() => Airport, (airport) => airport.arrivals, { eager: true, cascade: true, onUpdate: "CASCADE" })
    @JoinColumn({ name: "arrivalAirportId" })
    arrivalAirport?: Airport; // Sân bay đến

    @Column({ type: 'timestamptz', transformer: {
        to: (value: string | Date) => new Date(value), // Convert ISO string to Date for database
        from: (value: Date) => value.toISOString(),   // Convert Date to ISO string when retrieving
    } })
    departureTime: string;

    @Column({ type: 'timestamptz', transformer: {
        to: (value: string | Date) => new Date(value),
        from: (value: Date) => value.toISOString(),
    } })
    arrivalTime: string;
    
	@Column({
		type: "enum",
		enum: ["Scheduled", "Arrived", "Delayed", "Cancelled"],
		default: "Scheduled",
	})
	status?: "Scheduled" | "Arrived" | "Delayed" | "Cancelled"; // Trạng thái máy bay

    @Column({ type: "int" })
    availableSeats: number; // Ghế còn trống

	@Column({ type: "jsonb" })
  	seatClasses: Record<string, number>; // Cấu hình hạng ghế mặc định (JSON)

    // @Column({ type: "varchar", length: 50 })
    // flightType: string; // Loại chuyến bay (Domestic, International)

    @OneToMany(() => Booking, (booking) => booking.flight)
    bookings?: Booking[]; // Liên kết với bảng Booking

    @Column({ type: "float", nullable: true })
    duration?: number; // Thời gian bay (tính toán từ departureTime và arrivalTime)
}
