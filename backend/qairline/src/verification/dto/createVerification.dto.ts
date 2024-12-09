import { IsISO8601, IsObject, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVerificationDto {
    @ApiProperty({ description: 'User associated with the verification', type: () => User })
    @IsObject()
    user: User;

    @ApiProperty({ description: 'Verification token', example: 'some-verification-token' })
    @IsString()
    token: string;

    @ApiProperty({ description: 'Expiration date of the verification token', example: '2023-01-01T00:00:00Z' })
    @IsISO8601()
    expiresAt: string;

    @ApiProperty({ description: 'Creation date of the verification token', example: '2023-01-01T00:00:00Z', required: false })
    @IsOptional()
    @IsISO8601()
    createdAt?: string;
}
