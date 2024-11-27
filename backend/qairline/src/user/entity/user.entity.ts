import { Exclude } from "class-transformer";
import { Matches } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    phoneNumber: string

    @Column({nullable: true})
    currentHashedRefreshToken?: string;
}