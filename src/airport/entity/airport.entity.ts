import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;
}