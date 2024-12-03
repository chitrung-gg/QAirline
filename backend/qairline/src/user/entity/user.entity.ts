import { Exclude } from "class-transformer";
import { Matches } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", unique: true, length: 100 })
    email: string; 

    @Column({ type: "varchar", unique: true, length: 50 })
    username: string

    @Column({ type: "varchar", length: 255 })
    password: string

    @Column({ type: "varchar", length: 20, nullable: true })
    phoneNumber: string

    @Column({ type: "varchar", length: 50 })
    firstName: string; 
  
    @Column({ type: "varchar", length: 50 })
    lastName: string; 

    @Column({
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
    dob: string | null = null;

    @Column({
		type: "enum",
		enum: ["Male", "Female", "Other"]
	})
    gender: "Male" | "Female" | "Other"; // Giới tính

    @Column({ type: "varchar", length: 255, nullable: true })
    address: string; // Địa chỉ

    @Column({ type: "varchar", length: 20, nullable: true })
    passportNumber: string; // Số hộ chiếu

    @Column({
		type: "enum",
		enum: ['Admin', 'User', 'Staff', 'Other'],
        default: 'User'
	})
    role: 'Admin' | 'User' | 'Staff' | 'Other'
    
    @Column({
		type: "enum",
		enum: ['Active', 'Inactive', 'Banned', 'Other'],
        default: 'Active'
	})
    status?: 'Active' | 'Inactive' | 'Banned' | 'Other'; // Trạng thái tài khoản (Active, Inactive, Banned)
    
    @OneToMany(() => Booking, (booking) => booking.user)
    bookings?: Booking[];

    // @OneToMany(() => Payment, (payment) => payment.user)
    // payments: Payment[];

    @Column({type: "varchar", length: 255, nullable: true})
    accessToken?: string;

    @Column({type: "varchar", length: 255, nullable: true})
    refreshToken?: string;
}