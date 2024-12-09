import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Verification {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'User associated with the verification', type: () => User })
    @ManyToOne(() => User, { eager: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn({ name: 'userId' }) 
    user: User;

    @ApiProperty({ description: 'Verification token', example: 'some-verification-token' })
    @Column()
    token: string;

    @ApiProperty({ description: 'Expiration date of the verification token', example: '2023-01-01T00:00:00Z' })
    @Column({
        type: 'timestamptz', 
        transformer: {
          to: (value: string | Date | null) => {
            if (value === null) return null;
            return new Date(value).toISOString();
          },
          from: (value: Date) => {
            return value ? value.toISOString() : null;
          },
        },
    })
    expiresAt: string;

    @ApiProperty({ description: 'Creation date of the verification token', example: '2023-01-01T00:00:00Z', required: false })
    @CreateDateColumn({
        type: 'timestamptz', nullable: true,
        transformer: {
          to: (value: string | Date | null) => {
            if (value === null) return null;
            return new Date(value).toISOString();
          },
          from: (value: Date) => {
            return value ? value.toISOString() : null;
          },
        },
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt?: string;
}
