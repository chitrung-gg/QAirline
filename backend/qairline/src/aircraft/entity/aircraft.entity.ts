import { Flight } from "src/flight/entity/flight.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Aircraft {
  @PrimaryGeneratedColumn()
  id: number; // Primary Key

  @Column({ type: "varchar", length: 50, unique: true })
  aircraftCode: string; // Mã máy bay (unique)

  @Column({ type: "varchar", length: 100 })
  model: string; // Model của máy bay (Airbus A320, Boeing 737)

  @Column({ type: "varchar", length: 100 })
  manufacturer: string; // Nhà sản xuất

  @Column({ type: "int" })
  capacity: number; // Tổng số ghế của máy bay

  @Column({ type: "jsonb" })
  seatClasses: Record<string, number>; // Cấu hình hạng ghế mặc định (JSON)

  @Column({
    type: "enum",
    enum: ["Active", "Maintenance", "Retired"],
    default: "Active",
  })
  status: "Active" | "Maintenance" | "Retired"; // Trạng thái máy bay

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

  @OneToMany(() => Flight, (flight) => flight.aircraft)
  flights?: Flight[]; // Liên kết tới các chuyến bay sử dụng máy bay này
}
