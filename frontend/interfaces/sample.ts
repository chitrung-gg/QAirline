import { Flight, FlightStatus } from "@/interfaces/flight";
import { Aircraft, AircraftStatus } from "@/interfaces/aircraft";
import { Airport } from "@/interfaces/airport";

// Sample Aircraft Data
const sampleAircraft: Aircraft = {
  id: 1,
  aircraftCode: "A320-VN01",
  model: "A320",
  manufacturer: "Airbus",
  capacity: 180,
  seatClasses: {
    Economy: 150,
    Business: 20,
    "Premium Economy": 10,
  },
  status: AircraftStatus.ACTIVE,
};

// Sample Airport Data for Departure
const hanoi: Airport = {
  id: 1,
  name: "Noi Bai International Airport",
  city: "Hanoi",
  country: "Vietnam",
  iataCode: "HAN",
};

// Sample Airport Data for Arrival
const hcmc: Airport = {
  id: 2,
  name: "Tan Son Nhat International Airport",
  city: "Ho Chi Minh City",
  country: "Vietnam",
  iataCode: "SGN",
};

// Sample Flight Data
export const sampleFlights: Flight[] = [
  {
    id: 1,
    flightNumber: "VN123",
    aircraft: sampleAircraft,
    departureAirport: hanoi,
    arrivalAirport: hcmc,
    departureTime: "08:00",
    arrivalTime: "09:30",
    status: FlightStatus.SCHEDULED,
    availableSeats: 150,
    seatClasses: {
      Economy: 120,
      Business: 20,
      "Premium Economy": 10,
    },
    duration: "1h 30m",
    bookings: [],
    baseClassPrice: {
      Economy: 100,
      Business: 200,
      "Premium Economy": 150,
    },
  },
  {
    id: 2,
    flightNumber: "VN456",
    aircraft: sampleAircraft,
    departureAirport: hcmc,
    arrivalAirport: hanoi,
    departureTime: "14:00",
    arrivalTime: "15:30",
    status: FlightStatus.SCHEDULED,
    availableSeats: 140,
    seatClasses: {
      Economy: 110,
      Business: 20,
      "Premium Economy": 10,
    },
    duration: "1h 30m",
    bookings: [],
    baseClassPrice: {
      Economy: 100,
      Business: 200,
      "Premium Economy": 150,
    },
  },
  {
    id: 3,
    flightNumber: "VN789",
    aircraft: {
      ...sampleAircraft,
      id: 2,
      aircraftCode: "B787-VN02",
      model: "B787",
      manufacturer: "Boeing",
      capacity: 250,
      seatClasses: {
        Economy: 200,
        Business: 30,
        "Premium Economy": 20,
      },
    },
    departureAirport: {
      ...hanoi,
      id: 3,
      name: "Da Nang International Airport",
      city: "Da Nang",
      iataCode: "DAD",
    },
    arrivalAirport: {
      ...hcmc,
      id: 4,
      name: "Can Tho International Airport",
      city: "Can Tho",
      iataCode: "VCA",
    },
    departureTime: "10:30",
    arrivalTime: "12:00",
    status: FlightStatus.SCHEDULED,
    availableSeats: 200,
    seatClasses: {
      Economy: 170,
      Business: 20,
      "Premium Economy": 10,
    },
    duration: "1h 30m",
    bookings: [],
    baseClassPrice: {
      Economy: 120,
      Business: 250,
      "Premium Economy": 180,
    },
  },
];

// Export a function to get flights (useful for simulating API calls)
export const getFlights = () => {
  return new Promise<Flight[]>((resolve) => {
    setTimeout(() => {
      resolve(sampleFlights);
    }, 500);
  });
};
