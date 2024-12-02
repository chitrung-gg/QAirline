import { Exclude } from "class-transformer";
import { Matches } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", unique: true, length: 100 })
    email: string; // Địa chỉ email

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

    @Column({ type: 'timestamptz', transformer: {
        to: (value: string | Date) => new Date(value), // Convert ISO string to Date for database
        from: (value: Date) => value.toISOString(),   // Convert Date to ISO string when retrieving
      } })
    dob: string; // Ngày sinh của người dùng

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
    currentHashedRefreshToken?: string;
}