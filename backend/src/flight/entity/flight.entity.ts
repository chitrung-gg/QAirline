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

    @ManyToOne(() => Airport, (departureAirport) => departureAirport.id)
    @JoinColumn({name: 'departureAirportId'})
    departureAirport: Airport;

    @ManyToOne(() => Airport, (arrivalAirport) => arrivalAirport.id)
    @JoinColumn({name: 'arrivalAirportId'})
    arrivalAirport: Airport;

    @Column('timestamp')
    departureTime: Date;

    @Column('timestamp')
    arrivalTime: Date;

    @Column()
    status: string;

    @Column()
    availableSeats: number;
    
    @Column()
    flightDuration: string;
}