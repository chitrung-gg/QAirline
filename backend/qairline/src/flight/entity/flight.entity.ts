import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn, Index } from "typeorm";
import { Airport } from "src/airport/entity/airport.entity";
import { Aircraft } from "src/aircraft/entity/aircraft.entity";
import { Booking } from "src/booking/entity/booking.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Flight {
    @ApiProperty({ description: 'Unique identifier for the flight' })
    @PrimaryGeneratedColumn()
    id: number; // Khóa chính

    @ApiProperty({ description: 'Unique flight number' })
    @Column({ unique: true })
    flightNumber: string; // Số hiệu chuyến bay (duy nhất)

    @Index('aircraftIndex')
    @ApiProperty({ description: 'Aircraft assigned to this flight', type: () => Aircraft, nullable: true })
    @ManyToOne(() => Aircraft, (aircraft) => aircraft.flights, { eager: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true})
    @JoinColumn({ name: "aircraftId" })
    aircraft?: Aircraft; // Liên kết với bảng Aircraft

    @Index('departureAirportIndex')
    @ApiProperty({ description: 'Airport where the flight departs from', type: () => Airport, nullable: true })
    @ManyToOne(() => Airport, (airport) => airport.departures, { eager: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "departureAirportId" })
    departureAirport?: Airport; // Sân bay khởi hành

    @Index('arrivalAirportIndex')
    @ApiProperty({ description: 'Airport where the flight arrives at', type: () => Airport, nullable: true })
    @ManyToOne(() => Airport, (airport) => airport.arrivals, { eager: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE", nullable: true })
    @JoinColumn({ name: "arrivalAirportId" })
    arrivalAirport?: Airport; // Sân bay đến

    @ApiProperty({ description: 'Time of departure' })
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

    @ApiProperty({ description: 'Time of arrival' })
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
    
    @ApiProperty({ description: 'Current status of the flight', enum: ['Scheduled', 'Arrived', 'Delayed', 'Cancelled'], default: 'Scheduled' })
    @Column({
      type: "enum",
      enum: ["Scheduled", "Arrived", "Delayed", "Cancelled"],
      default: "Scheduled",
    })
    status?: "Scheduled" | "Arrived" | "Delayed" | "Cancelled"; // Trạng thái máy bay
  
    @ApiProperty({ description: 'Number of available seats for the flight' })
    @Column({ type: "int" })
    availableSeats: number; // Ghế còn trống

    @ApiProperty({ 
      description: 'JSON configuration for seat classes', 
      type: () => Object, 
      // additionalProperties: { type: 'number' }
    })
	  @Column({ type: "jsonb" })
  	seatClasses: Record<string, number>; // Cấu hình hạng ghế mặc định (JSON)

    // @Column({ type: "varchar", length: 50 })
    // flightType: string; // Loại chuyến bay (Domestic, International)

    @ApiProperty({ description: 'Bookings associated with the flight', type: () => Booking })
    @OneToMany(() => Booking, (booking) => booking.flight, {})
    bookings?: Booking[]; // Liên kết với bảng Booking

    @ApiProperty({ description: 'Flight duration in hours (calculated from departureTime and arrivalTime)', nullable: true })
    @Column({ type: "float", nullable: true })
    duration?: number; // Thời gian bay (tính toán từ departureTime và arrivalTime)

    @ApiProperty({ 
      description: 'Base price for each seat class', 
      type: () => Object, 
      // additionalProperties: { type: 'number' }, 
      nullable: true 
    })
    @Column({type: "jsonb", nullable: true})
    baseClassPrice?: Record<string, number>   // Giá tiền base cho mỗi loại hạng ghế
}
