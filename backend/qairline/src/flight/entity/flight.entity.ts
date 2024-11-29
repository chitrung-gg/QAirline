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

    @ManyToOne(() => Aircraft, (aircraft) => aircraft.flights, { eager: true })
    @JoinColumn({ name: "aircraftId" })
    aircraft: Aircraft; // Liên kết với bảng Aircraft

    @ManyToOne(() => Airport, { eager: true })
    @JoinColumn({ name: "departureAirportId" })
    departureAirport: Airport; // Sân bay khởi hành

    @ManyToOne(() => Airport, { eager: true })
    @JoinColumn({ name: "arrivalAirportId" })
    arrivalAirport: Airport; // Sân bay đến

    @Column({ type: "timestamp" })
    departureTime: Date; // Thời gian khởi hành

    @Column({ type: "timestamp" })
    arrivalTime: Date; // Thời gian đến

	@Column({
		type: "enum",
		enum: ["Scheduled", "Arrived", "Delayed", "Cancelled"],
		default: "Scheduled",
	})
	status?: "Scheduled" | "Arrived" | "Delayed" | "Cancelled"; // Trạng thái máy bay

    @Column({ type: "int" })
    availableSeats: number; // Ghế còn trống

    // @Column({ type: "varchar", length: 50 })
    // flightType: string; // Loại chuyến bay (Domestic, International)

    @OneToMany(() => Booking, (booking) => booking.flight)
    bookings?: Booking[]; // Liên kết với bảng Booking

    @Column({ type: "float", nullable: true })
    duration?: number; // Thời gian bay (tính toán từ departureTime và arrivalTime)
}
