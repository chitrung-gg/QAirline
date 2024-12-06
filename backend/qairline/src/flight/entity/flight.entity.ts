import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn, Index } from "typeorm";
import { Airport } from "src/airport/entity/airport.entity";
import { Aircraft } from "src/aircraft/entity/aircraft.entity";
import { Booking } from "src/booking/entity/booking.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Flight {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number; // Khóa chính

    @ApiProperty()
    @Column({ unique: true })
    flightNumber: string; // Số hiệu chuyến bay (duy nhất)

    @Index('aircraftIndex')
    @ApiProperty()
    @ManyToOne(() => Aircraft, (aircraft) => aircraft.flights, { eager: true, cascade: true, onUpdate: "CASCADE", nullable: true})
    @JoinColumn({ name: "aircraftId" })
    aircraft?: Aircraft; // Liên kết với bảng Aircraft

    @Index('departureAirportIndex')
    @ApiProperty()
    @ManyToOne(() => Airport, (airport) => airport.departures, { eager: true, cascade: true, onUpdate: "CASCADE", nullable: true })
    @JoinColumn({ name: "departureAirportId" })
    departureAirport?: Airport; // Sân bay khởi hành

    @Index('arrivalAirportIndex')
    @ApiProperty()
    @ManyToOne(() => Airport, (airport) => airport.arrivals, { eager: true, cascade: true, onUpdate: "CASCADE", nullable: true })
    @JoinColumn({ name: "arrivalAirportId" })
    arrivalAirport?: Airport; // Sân bay đến

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
    departureTime: string;

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
    arrivalTime: string;
    
    @ApiProperty()
    @Column({
      type: "enum",
      enum: ["Scheduled", "Arrived", "Delayed", "Cancelled"],
      default: "Scheduled",
    })
    status?: "Scheduled" | "Arrived" | "Delayed" | "Cancelled"; // Trạng thái máy bay
  
    @ApiProperty()
    @Column({ type: "int" })
    availableSeats: number; // Ghế còn trống

    @ApiProperty()
	  @Column({ type: "jsonb" })
  	seatClasses: Record<string, number>; // Cấu hình hạng ghế mặc định (JSON)

    // @Column({ type: "varchar", length: 50 })
    // flightType: string; // Loại chuyến bay (Domestic, International)

    @ApiProperty()
    @OneToMany(() => Booking, (booking) => booking.flight)
    bookings?: Booking[]; // Liên kết với bảng Booking

    @ApiProperty()
    @Column({ type: "float", nullable: true })
    duration?: number; // Thời gian bay (tính toán từ departureTime và arrivalTime)
}
