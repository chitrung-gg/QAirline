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

  @ManyToOne(() => Aircraft, (aircraft) => aircraft.aircraft_code, { eager: true })
  @JoinColumn({ name: "aircraft_id" })
  aircraft: Aircraft; // Liên kết với bảng Aircraft

  @Column({ type: "varchar", length: 100 })
  airlineName: string; // Tên hãng hàng không

  @ManyToOne(() => Airport, { eager: true })
  @JoinColumn({ name: "departure_airport_id" })
  departureAirport: Airport; // Sân bay khởi hành

  @ManyToOne(() => Airport, { eager: true })
  @JoinColumn({ name: "arrival_airport_id" })
  arrivalAirport: Airport; // Sân bay đến

  @Column({ type: "timestamp" })
  departureTime: Date; // Thời gian khởi hành

  @Column({ type: "timestamp" })
  arrivalTime: Date; // Thời gian đến

  @Column({ type: "varchar", length: 50 })
  status: string; // Trạng thái chuyến bay (Scheduled, Delayed, Cancelled, ...)

  @Column({ type: "int" })
  availableSeats: number; // Ghế còn trống

  @Column({ type: "int" })
  maxSeats: number; // Tổng số ghế (lấy từ `Aircraft`)

  @Column({ type: "float" })
  price: number; // Giá vé cơ bản

  @Column({ type: "varchar", length: 50 })
  flightType: string; // Loại chuyến bay (Domestic, International)

  @OneToMany(() => Booking, (booking) => booking.flight)
  bookings: Booking[]; // Liên kết với bảng Booking

  @Column({ type: "float", nullable: true })
  duration: number; // Thời gian bay (tính toán từ departureTime và arrivalTime)
}
