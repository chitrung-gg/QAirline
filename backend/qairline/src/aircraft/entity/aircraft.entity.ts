import { ApiProperty } from "@nestjs/swagger";
import { Flight } from "src/flight/entity/flight.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Aircraft {
  @ApiProperty({ description: 'Primary Key', example: 1 })
  @PrimaryGeneratedColumn()
  id: number; // Primary Key

  @ApiProperty({ description: 'Aircraft code', example: 'A320' })
  @Column({ type: "varchar", length: 50, unique: true })
  aircraftCode: string; // Mã máy bay (unique)

  @ApiProperty({ description: 'Model of the aircraft', example: 'Airbus A320' })
  @Column({ type: "varchar", length: 100 })
  model: string; // Model của máy bay (Airbus A320, Boeing 737)

  @ApiProperty({ description: 'Manufacturer of the aircraft', example: 'Airbus' })
  @Column({ type: "varchar", length: 100 })
  manufacturer: string; // Nhà sản xuất

  @ApiProperty({ description: 'Capacity of the aircraft', example: 180 })
  @Column({ type: "int" })
  capacity: number; // Tổng số ghế của máy bay

  @ApiProperty({ description: 'Seat classes configuration', example: { economy: 150, business: 30 } })
  @Column({ type: "jsonb" })
  seatClasses: Record<string, number>; // Cấu hình hạng ghế mặc định (JSON)

  @ApiProperty({ description: 'Status of the aircraft', example: 'Active' })
  @Column({
    type: "enum",
    enum: ["Active", "Maintenance", "Retired"],
    default: "Active",
  })
  status: "Active" | "Maintenance" | "Retired"; // Trạng thái máy bay

  @ApiProperty({ description: 'Creation date of the aircraft record', example: '2023-01-01T00:00:00Z' })
  @CreateDateColumn({
    type: 'timestamptz', nullable: true,
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
  createdAt?: string;

  @ApiProperty({ description: 'Last update date of the aircraft record', example: '2023-01-01T00:00:00Z' })
  @UpdateDateColumn({
    type: 'timestamptz', nullable: true,
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
  updatedAt?: string;

  @ApiProperty({ description: 'List of flights associated with the aircraft', type: () => Flight })
  @OneToMany(() => Flight, (flight) => flight.aircraft)
  flights?: Flight[]; // Liên kết tới các chuyến bay sử dụng máy bay này
}
