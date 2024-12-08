import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Verification {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @ManyToOne(() => User, {eager: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinColumn({ name: 'userId' }) 
    user: User;

    @ApiProperty()
    @Column()
    token: string;

    @ApiProperty()
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

    @ApiProperty()
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
