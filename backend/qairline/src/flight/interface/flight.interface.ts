
import { Aircraft } from "src/aircraft/entity/aircraft.entity";
import { Airport } from "src/airport/entity/airport.entity";
import { Booking } from "src/booking/entity/booking.entity";

export interface Flight {
    id: number;
    flightNumber: string;
    aircraft: Aircraft;
    departureAirport: Airport;
    arrivalAirport: Airport;
    departureTime: Date;
    arrivalTime: Date;
    status?: "Scheduled" | "Arrived" | "Delayed" | "Cancelled";
    availableSeats: number;
    bookings?: Booking[]
    duration?: number
    // flightDuration: string;
}