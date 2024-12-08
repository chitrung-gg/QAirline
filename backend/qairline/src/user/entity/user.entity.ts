import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Matches } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ type: "varchar", unique: true, length: 100 })
    email: string; 

    @ApiProperty()
    @Column({ type: "varchar", unique: true, length: 50 })
    username: string

    @ApiProperty()
    @Column({ type: "varchar", length: 255 })
    password: string

    @ApiProperty()
    @Column({ type: "varchar", length: 20, nullable: true })
    phoneNumber: string

    @ApiProperty()
    @Column({ type: "varchar", length: 50 })
    firstName: string; 
  
    @ApiProperty()
    @Column({ type: "varchar", length: 50 })
    lastName: string; 

    @ApiProperty()
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

    @ApiProperty()
    @Column({
		type: "enum",
		enum: ["Male", "Female", "Other"]
	  })
    gender: "Male" | "Female" | "Other"; // Giới tính

    @ApiProperty()
    @Column({ type: "varchar", length: 255, nullable: true })
    address: string; // Địa chỉ

    @ApiProperty()
    @Column({ type: "varchar", length: 20, nullable: true })
    passportNumber: string; // Số hộ chiếu

    @ApiProperty()
    @Column({
		type: "enum",
		enum: ['Admin', 'User', 'Staff', 'Other'],
        default: 'User'
	  })
    role: 'Admin' | 'User' | 'Staff' | 'Other'
    
    @ApiProperty()
    @Column({
      type: "enum",
      enum: ['Active', 'Inactive', 'Banned', 'Other'],
      default: 'Inactive'
	  })
    status?: 'Active' | 'Inactive' | 'Banned' | 'Other'; // Trạng thái tài khoản (Active, Inactive, Banned)
    
    @ApiProperty()
    @OneToMany(() => Booking, (booking) => booking.user)
    bookings?: Booking[];

    // @ApiProperty()
    // @OneToMany(() => Payment, (payment) => payment.user)
    // payments: Payment[];

    @ApiProperty()
    @Column({type: "varchar", length: 255, nullable: true})
    accessToken?: string;

    @ApiProperty()
    @Column({type: "varchar", length: 255, nullable: true})
    refreshToken?: string;
}