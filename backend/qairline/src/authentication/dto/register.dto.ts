import { IsArray, IsEmail, IsIn, IsISO8601, IsOptional, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator";
import { Booking } from "src/booking/entity/booking.entity";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({ description: 'Email of the user', example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Username of the user', example: 'johndoe' })
    @IsString()
    username: string;

    @ApiProperty({ description: 'Password of the user', example: 'password123' })
    @IsString()
    password: string;

    @ApiProperty({ description: 'Phone number of the user', example: '+1234567890' })
    @IsString()
    @MinLength(6)
    @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
    phoneNumber: string;

    @ApiProperty({ description: 'First name of the user', example: 'John' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'Date of birth of the user', example: '1990-01-01T00:00:00Z' })
    @IsISO8601()
    dob: string;

    @ApiProperty({ description: 'Gender of the user', enum: ["Male", "Female", "Other"] })
    @IsString()
    @IsIn(["Male", "Female", "Other"])
    gender: "Male" | "Female" | "Other";

    @ApiProperty({ description: 'Address of the user', example: '123 Main St' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'Passport number of the user', example: 'A12345678' })
    @IsString()
    passportNumber: string;

    @ApiProperty({ description: 'Role of the user', enum: ['Admin', 'User', 'Staff', 'Other'], required: false })
    @IsString()
    @IsOptional()
    @IsIn(['Admin', 'User', 'Staff', 'Other'])
    role?: 'Admin' | 'User' | 'Staff' | 'Other';
    
    @ApiProperty({ description: 'Status of the user account', enum: ['Active', 'Inactive', 'Banned', 'Other'], required: false })
    @IsString()
    @IsOptional()
    @IsIn(['Active', 'Inactive', 'Banned', 'Other'])
    status?: 'Active' | 'Inactive' | 'Banned' | 'Other';

    @ApiProperty({ description: 'Bookings associated with the user', type: () => [Booking], required: false })
    @IsArray()
    @IsOptional()
    bookings?: Booking[];

    @ApiProperty({ description: 'Current hashed refresh token of the user', example: 'hashed-refresh-token-123', required: false })
    @IsOptional()
    @IsString()
    currentHashedRefreshToken?: string;
}