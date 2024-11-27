import { IsEmail, IsNumber, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator";

export class SignUpDto {
    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsString()
    @MinLength(6)
    // @Matches(/^(?=.0*[0-9])/, {message: 'Password must contain at least one number'})
    password: string

    @IsString()
    @MinLength(6)
    @Matches(/^\d+$/, { message: 'Phone number must contain only digits' })
    phoneNumber: string
}