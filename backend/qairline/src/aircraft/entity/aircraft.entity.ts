import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("aircrafts")
export class Aircraft {
  @PrimaryGeneratedColumn()
  aircraft_id: number; // Primary Key

  @Column({ type: "varchar", length: 50, unique: true })
  aircraft_code: string; // Mã máy bay (unique)

  @Column({ type: "varchar", length: 100 })
  model: string; // Model của máy bay (Airbus A320, Boeing 737)

  @Column({ type: "varchar", length: 100 })
  manufacturer: string; // Nhà sản xuất

  @Column({ type: "int" })
  capacity: number; // Tổng số ghế của máy bay

  @Column({ type: "json" })
  seat_classes: Record<string, number>; // Cấu hình hạng ghế mặc định (JSON)

  @CreateDateColumn()
  created_at: Date; // Thời gian tạo

  @UpdateDateColumn()
  updated_at: Date; // Thời gian cập nhật
}
