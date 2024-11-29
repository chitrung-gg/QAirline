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

    @Column({ type: "date", nullable: true })
    dob: Date; // Ngày sinh của người dùng

    @Column({ type: "varchar", length: 10, nullable: true })
    gender: string; // Giới tính

    @Column({ type: "varchar", length: 255, nullable: true })
    address: string; // Địa chỉ

    @Column({ type: "varchar", length: 20, nullable: true })
    passportNumber: string; // Số hộ chiếu

    @Column({ type: "varchar", length: 20, default: "User" })
    role: 'Admin' | 'User' | 'Staff'
    
    @Column({ type: "varchar", length: 20, default: "Active" })
    status: string; // Trạng thái tài khoản (Active, Inactive, Banned)
    
    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];

    // @OneToMany(() => Payment, (payment) => payment.user)
    // payments: Payment[];

    @Column({type: "varchar", length: 255, nullable: true})
    currentHashedRefreshToken?: string;
}