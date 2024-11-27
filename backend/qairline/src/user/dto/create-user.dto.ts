import { IsEmail, IsNumber, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsString()
    password: string

    @IsString()
    @MinLength(6)
    @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
    phoneNumber: string
}