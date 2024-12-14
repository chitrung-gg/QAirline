import { ApiProperty } from "@nestjs/swagger";
import { Flight } from "src/flight/entity/flight.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Airport {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number; // Primary Key
  
    @ApiProperty({ description: 'Name of the airport', example: 'John F. Kennedy International Airport' })
    @Column({ type: "varchar", length: 100 })
    name: string; // Name of the airport
  
    @ApiProperty({ description: 'City where the airport is located', example: 'New York' })
    @Column({ type: "varchar", length: 100 })
    city: string; // City where the airport is located
  
    @ApiProperty({ description: 'Country where the airport is located', example: 'USA' })
    @Column({ type: "varchar", length: 100 })
    country: string; // Country where the airport is located
  
    @ApiProperty({ description: 'IATA code of the airport', example: 'JFK' })
    @Column({ type: "varchar", length: 10 })
    iataCode: string; // IATA code (e.g., "JFK")
  
    @ApiProperty({ description: 'Flights departing from this airport', type: () => [Flight], required: false })
    @OneToMany(() => Flight, (flight) => flight.departureAirport)
    departures?: Flight[]; // Flights departing from this airport
  
    @ApiProperty({ description: 'Flights arriving at this airport', type: () => [Flight], required: false })
    @OneToMany(() => Flight, (flight) => flight.arrivalAirport)
    arrivals?: Flight[]; // Flights arriving at this airport
}