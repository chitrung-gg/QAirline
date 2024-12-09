import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LogInDto {
    @ApiProperty({ description: 'Email of the user', example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Password of the user', example: 'password123' })
    @IsString()
    password: string;
}