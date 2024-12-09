import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Address } from "nodemailer/lib/mailer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEmailDto {
    @ApiProperty({ description: 'Email address of the recipient', example: 'recipient@example.com' })
    @IsEmail()
    recipient: string;
    
    @ApiProperty({ description: 'Subject of the email', example: 'Welcome to our service' })
    @IsString()
    @IsNotEmpty()
    subject: string;

    @ApiProperty({ description: 'Content of the email', example: 'Hello, welcome to our service. We are glad to have you!' })
    @IsString()
    @IsNotEmpty()
    content: string;
}
