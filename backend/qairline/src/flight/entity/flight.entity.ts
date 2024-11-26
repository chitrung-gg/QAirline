import { Airport } from "src/airport/entity/airport.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    flightNumber: string;

    @Column()
    airline: string;

    // TODO: Change to Airport instance when needed
    // @ManyToOne(() => Airport, (departureAirport) => departureAirport.id)
    // @JoinColumn({name: 'departureAirportId'})
    @Column()
    departureAirport: string;

    // @ManyToOne(() => Airport, (arrivalAirport) => arrivalAirport.id)
    // @JoinColumn({name: 'arrivalAirportId'})
    @Column()
    arrivalAirport: string;

    @Column()
    departureTime: Date;

    @Column()
    arrivalTime: Date;

    @Column()
    status: string;

    @Column()
    availableSeats: number;
    
    // @Column()
    // flightDuration: string;
}