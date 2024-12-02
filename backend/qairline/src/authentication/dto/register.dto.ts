import { IsArray, IsDate, IsEmail, IsIn, IsISO8601, IsNumber, IsOptional, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";

export class RegisterDto {
    @IsEmail()
    email: string

    @IsString()
    username: string

    @IsString()
    password: string

    @IsString()
    @MinLength(6)
    @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
    phoneNumber: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsISO8601()
    dob: string

    @IsString()
    @IsIn(["Male", "Female", "Other"])
    gender: "Male" | "Female" | "Other";

    @IsString()
    address: string

    @IsString()
    passportNumber: string;

    @IsString()
    @IsOptional()
    @IsIn(['Admin', 'User', 'Staff', 'Other'])
    role?: 'Admin' | 'User' | 'Staff' | 'Other'
    
    @IsString()
    @IsOptional()
    @IsIn(['Admin', 'User', 'Staff', 'Other'])
    status?: 'Active' | 'Inactive' | 'Banned' | 'Other'

    @IsArray()
    @IsOptional()
    bookings?: Booking[]

    @IsOptional()
    @IsString()
    currentHashedRefreshToken?: string;
}