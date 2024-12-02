import { Flight } from "src/flight/entity/flight.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number; // Primary Key
  
    @Column({ type: "varchar", length: 100 })
    name: string; // Name of the airport
  
    @Column({ type: "varchar", length: 100 })
    city: string; // City where the airport is located
  
    @Column({ type: "varchar", length: 100 })
    country: string; // Country where the airport is located
  
    @Column({ type: "varchar", length: 10 })
    iataCode: string; // IATA code (e.g., "JFK")
  
    @OneToMany(() => Flight, (flight) => flight.departureAirport)
    departures?: Flight[]; // Flights departing from this airport
  
    @OneToMany(() => Flight, (flight) => flight.arrivalAirport)
    arrivals?: Flight[]; // Flights arriving at this airport
}