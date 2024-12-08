import { IsISO8601, IsObject, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateVerificationDto {
    @IsObject()
    user: User;

    @IsString()
    token: string;

    @IsISO8601()
    expiresAt: string;

    @IsOptional()
    @IsISO8601()
    createdAt?: string;
}
