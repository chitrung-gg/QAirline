import { Flight, FlightStatus } from "@/interfaces/flight";
import { Aircraft, AircraftStatus } from "@/interfaces/aircraft";
import { Airport } from "@/interfaces/airport";

// Sample Aircraft Data
const sampleAircraft: Aircraft = {
  id: 1,
  aircraftCode: "B787-9",
  model: "Boeing 787-9 Dreamliner",
  manufacturer: "Boeing",
  capacity: 296,
  seatClasses: {
    Economy: 240,
    "Premium Economy": 28,
    Business: 28,
  },
  status: AircraftStatus.ACTIVE,
  createdAt: new Date("2022-01-15").toISOString(),
  updatedAt: new Date("2024-01-20").toISOString(),
};

// Sample Departure Airport
const departureAirport: Airport = {
  id: 101,
  name: "Tan Son Nhat International Airport",
  city: "Ho Chi Minh City",
  country: "Vietnam",
  iataCode: "SGN",
};

// Sample Arrival Airport
const arrivalAirport: Airport = {
  id: 201,
  name: "Noi Bai International Airport",
  city: "Hanoi",
  country: "Vietnam",
  iataCode: "HAN",
};

// Sample Flight Data
export const sampleFlights: Flight[] = [
  {
    id: 1001,
    flightNumber: "VN123",
    aircraft: sampleAircraft,
    departureAirport: departureAirport,
    arrivalAirport: arrivalAirport,
    departureTime: new Date("2024-07-15T08:00:00").toISOString(),
    arrivalTime: new Date("2024-07-15T09:30:00").toISOString(),
    status: FlightStatus.SCHEDULED,
    availableSeats: 150,
    seatClasses: {
      Economy: 120,
      "Premium Economy": 15,
      Business: 15,
    },
    duration: 90,
    bookings: [],
  },
  {
    id: 1002,
    flightNumber: "VN456",
    aircraft: {
      ...sampleAircraft,
      id: 2,
      aircraftCode: "A350-900",
      model: "Airbus A350-900",
      manufacturer: "Airbus",
      capacity: 320,
    },
    departureAirport: {
      ...departureAirport,
      id: 102,
      name: "Da Nang International Airport",
      iataCode: "DAD",
    },
    arrivalAirport: {
      ...arrivalAirport,
      id: 202,
      name: "Can Tho International Airport",
      iataCode: "VCA",
    },
    departureTime: new Date("2024-07-16T14:45:00").toISOString(),
    arrivalTime: new Date("2024-07-16T16:15:00").toISOString(),
    status: FlightStatus.SCHEDULED,
    availableSeats: 200,
    seatClasses: {
      Economy: 160,
      "Premium Economy": 20,
      Business: 20,
    },
    duration: 90,
    bookings: [],
  },
  {
    id: 1003,
    flightNumber: "VN789",
    aircraft: {
      ...sampleAircraft,
      id: 3,
      aircraftCode: "B737-800",
      model: "Boeing 737-800",
      manufacturer: "Boeing",
      capacity: 189,
    },
    departureAirport: {
      ...departureAirport,
      id: 103,
      name: "Phu Quoc International Airport",
      iataCode: "PQC",
    },
    arrivalAirport: {
      ...arrivalAirport,
      id: 203,
      name: "Cam Ranh International Airport",
      iataCode: "CXR",
    },
    departureTime: new Date("2024-07-17T10:30:00").toISOString(),
    arrivalTime: new Date("2024-07-17T11:45:00").toISOString(),
    status: FlightStatus.SCHEDULED,
    availableSeats: 100,
    seatClasses: {
      Economy: 80,
      "Premium Economy": 10,
      Business: 10,
    },
    duration: 75,
    bookings: [],
  },
];

// Optional: Function to generate more random flight data
export function generateRandomFlights(count: number = 5): Flight[] {
  const flights: Flight[] = [];
  const vietnameseCities = [
    { name: "Ho Chi Minh City", code: "SGN" },
    { name: "Hanoi", code: "HAN" },
    { name: "Da Nang", code: "DAD" },
    { name: "Nha Trang", code: "CXR" },
    { name: "Phu Quoc", code: "PQC" },
    { name: "Can Tho", code: "VCA" },
  ];

  for (let i = 0; i < count; i++) {
    const departureCity =
      vietnameseCities[Math.floor(Math.random() * vietnameseCities.length)];
    const arrivalCity = vietnameseCities.filter(
      (city) => city !== departureCity
    )[Math.floor(Math.random() * (vietnameseCities.length - 1))];

    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + Math.floor(Math.random() * 30));

    const flight: Flight = {
      id: 2000 + i,
      flightNumber: `VN${Math.floor(Math.random() * 1000)}`,
      aircraft: {
        ...sampleAircraft,
        id: 1000 + i,
        aircraftCode: ["B787-9", "A350-900", "B737-800"][
          Math.floor(Math.random() * 3)
        ],
        model: ["Boeing 787-9", "Airbus A350", "Boeing 737"][
          Math.floor(Math.random() * 3)
        ],
      },
      departureAirport: {
        id: 10000 + i,
        name: `${departureCity.name} Airport`,
        city: departureCity.name,
        country: "Vietnam",
        iataCode: departureCity.code,
      },
      arrivalAirport: {
        id: 20000 + i,
        name: `${arrivalCity.name} Airport`,
        city: arrivalCity.name,
        country: "Vietnam",
        iataCode: arrivalCity.code,
      },
      departureTime: new Date(
        baseDate.getTime() + Math.random() * 86400000
      ).toISOString(),
      arrivalTime: new Date(
        baseDate.getTime() + Math.random() * 86400000 + 2 * 60 * 60 * 1000
      ).toISOString(),
      status: FlightStatus.SCHEDULED,
      availableSeats: Math.floor(Math.random() * 250),
      seatClasses: {
        Economy: Math.floor(Math.random() * 200),
        "Premium Economy": Math.floor(Math.random() * 30),
        Business: Math.floor(Math.random() * 30),
      },
      duration: Math.floor(Math.random() * 180),
      bookings: [],
    };

    flights.push(flight);
  }

  return flights;
}
