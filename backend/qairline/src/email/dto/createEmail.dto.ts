import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Address } from "nodemailer/lib/mailer";

export class CreateEmailDto {
    @IsEmail()
    recipient: string;
    
    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
