export interface FlightProps {
  id?: number;
  departure_location: string;
  departure_time: string;
  departure_date: string;
  departure_airport: string;
  arrival_location: string;
  arrival_time: string;
  arrival_date: string;
  arrival_airport: string;
  price: number;
  duration: string;
  type: string;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

export const FlightStorageKey = {
  SELECTED_FLIGHT: "selectedFlight",
  BOOKING_PASSENGER_INFO: "bookingPassengerInfo",
  BOOKING_FLIGHT_DETAILS: "bookingFlightDetails",
};

export function saveFlightToLocalStorage(flight: FlightProps) {
  try {
    localStorage.setItem(
      FlightStorageKey.SELECTED_FLIGHT,
      JSON.stringify(flight)
    );
    localStorage.setItem(
      FlightStorageKey.BOOKING_FLIGHT_DETAILS,
      JSON.stringify(flight)
    );
  } catch (error) {
    console.error("Error saving flight to localStorage:", error);
    alert("Không thể lưu thông tin chuyến bay");
  }
}

export function getFlightFromLocalStorage(): FlightProps | null {
  try {
    const storedFlight =
      localStorage.getItem(FlightStorageKey.SELECTED_FLIGHT) ||
      localStorage.getItem(FlightStorageKey.BOOKING_FLIGHT_DETAILS);
    return storedFlight ? JSON.parse(storedFlight) : null;
  } catch (error) {
    console.error("Error retrieving flight from localStorage:", error);
    return null;
  }
}

export function savePassengerInfoToLocalStorage(passengerInfo: PassengerInfo) {
  try {
    localStorage.setItem(
      FlightStorageKey.BOOKING_PASSENGER_INFO,
      JSON.stringify(passengerInfo)
    );
  } catch (error) {
    console.error("Error saving passenger info to localStorage:", error);
    alert("Không thể lưu thông tin hành khách");
  }
}

export function getPassengerInfoFromLocalStorage(): PassengerInfo | null {
  try {
    const storedPassengerInfo = localStorage.getItem(
      FlightStorageKey.BOOKING_PASSENGER_INFO
    );
    return storedPassengerInfo ? JSON.parse(storedPassengerInfo) : null;
  } catch (error) {
    console.error("Error retrieving passenger info from localStorage:", error);
    return null;
  }
}

export function clearBookingLocalStorage() {
  try {
    localStorage.removeItem(FlightStorageKey.SELECTED_FLIGHT);
    localStorage.removeItem(FlightStorageKey.BOOKING_PASSENGER_INFO);
    localStorage.removeItem(FlightStorageKey.BOOKING_FLIGHT_DETAILS);
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}