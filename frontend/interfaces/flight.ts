import { Aircraft } from "./aircraft";
import { Airport } from "./airport";
import { Booking } from "./booking";

export interface Flight {
  id: number;
  flightNumber: string;
  aircraft?: Aircraft;
  departureAirport?: Airport;
  arrivalAirport?: Airport;
  departureTime: string;
  arrivalTime: string;
  status?: FlightStatus;
  availableSeats: number;
  seatClasses: Record<string, number>;
  bookings?: Booking[];
  duration?: number;
}

export enum FlightStatus {
  SCHEDULED = "Scheduled",
  ARRIVED = "Arrived",
  DELAYED = "Delayed",
  CANCELLED = "Cancelled",
}