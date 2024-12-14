import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Matches } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Email of the user', example: 'john.doe@example.com' })
    @Column({ type: "varchar", unique: true, length: 100 })
    email: string; 

    @ApiProperty({ description: 'Username of the user', example: 'johndoe' })
    @Column({ type: "varchar", unique: true, length: 50 })
    username: string;

    @ApiProperty({ description: 'Password of the user', example: 'password123' })
    @Column({ type: "varchar", length: 255 })
    password: string;

    @ApiProperty({ description: 'Phone number of the user', example: '+1234567890', nullable: true })
    @Column({ type: "varchar", length: 20, nullable: true })
    phoneNumber: string;

    @ApiProperty({ description: 'First name of the user', example: 'John', nullable: true })
    @Column({ type: "varchar", length: 50, nullable: true })
    firstName?: string; 
  
    @ApiProperty({ description: 'Last name of the user', example: 'Doe', nullable: true })
    @Column({ type: "varchar", length: 50, nullable: true })
    lastName?: string; 

    @ApiProperty({ description: 'Date of birth of the user', example: '1990-01-01T00:00:00Z', nullable: true })
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
    dob?: string | null = null;

    @ApiProperty({ description: 'Gender of the user', enum: ["Male", "Female", "Other"], nullable: true })
    @Column({
      type: "enum",
      enum: ["Male", "Female", "Other"],
      nullable: true
    })
    gender?: "Male" | "Female" | "Other"; // Giới tính

    @ApiProperty({ description: 'Address of the user', example: '123 Main St', nullable: true })
    @Column({ type: "varchar", length: 255, nullable: true })
    address?: string; // Địa chỉ

    @ApiProperty({ description: 'Passport number of the user', example: 'A12345678', nullable: true })
    @Column({ type: "varchar", length: 20, nullable: true })
    passportNumber?: string; // Số hộ chiếu

    @ApiProperty({ description: 'Role of the user', enum: ['Admin', 'User'], default: 'User' })
    @Column({
      type: "enum",
      enum: ['Admin', 'User'],
      default: 'User'
    })
    role?: 'Admin' | 'User';
    
    @ApiProperty({ description: 'Bookings associated with the user', type: () => [Booking] })
    @OneToMany(() => Booking, (booking) => booking.user)
    bookings?: Booking[];

    @ApiProperty({ description: 'Access token of the user', example: 'access-token-123', nullable: true })
    @Column({ type: "varchar", length: 255, nullable: true })
    accessToken?: string;

    @ApiProperty({ description: 'Refresh token of the user', example: 'refresh-token-123', nullable: true })
    @Column({ type: "varchar", length: 255, nullable: true })
    refreshToken?: string;
}