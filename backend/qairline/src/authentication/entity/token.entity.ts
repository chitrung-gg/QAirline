import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RefreshToken {
    @ApiProperty({ description: 'Unique identifier for the refresh token', example: '123e4567-e89b-12d3-a456-426614174000' })
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @ApiProperty({ description: 'The refresh token string', example: 'some-refresh-token' })
    @Column()  
    token: string;

    @ApiProperty({ description: 'ID of the user associated with the refresh token', example: 1 })
    @Column()
    userId: number;
    
    @ApiProperty({ description: 'Expiry date of the refresh token', example: '2023-01-01T00:00:00Z' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    expiryDate: Date;
}
