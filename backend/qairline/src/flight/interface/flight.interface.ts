export interface Flight {
    id: number;
    flightNumber: string;
    airline: string;
    departureAirport: string;
    arrivalAirport: string;
    departureTime: Date;
    arrivalTime: Date;
    status?: string;
    availableSeats: number;
    // flightDuration: string;
}