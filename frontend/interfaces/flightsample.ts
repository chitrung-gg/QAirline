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
  discount?: DiscountInfo;
}

export interface DiscountInfo {
  code?: string;
  originalPrice: number;
  discountedPrice?: number;
  discountPercentage?: number;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

export const sampleFlightData = [
  {
    id: 1,
    departure_location: "Hà Nội",
    departure_time: "07:00",
    departure_airport: "Nội Bài (HAN)",
    arrival_location: "Hồ Chí Minh",
    arrival_time: "09:00",
    arrival_airport: "Tân Sơn Nhất (SGN)",
    departure_date: "20/12/2023",
    arrival_date: "21/12/2023",
    price: 2500000,
    duration: "2h 00m",
    type: "Phổ thông",
    baggage: "20kg",
    meal: "Bữa sáng nhẹ",
    wifi: true,
    entertainment: false,
  },
  {
    id: 2,
    departure_location: "Đà Nẵng",
    departure_time: "13:30",
    departure_airport: "Đà Nẵng (DAD)",
    arrival_location: "Nha Trang",
    arrival_time: "14:45",
    arrival_airport: "Cam Ranh (CXR)",
    departure_date: "20/12/2023",
    arrival_date: "21/12/2023",
    price: 1800000,
    duration: "1h 15m",
    type: "Thương gia",
    baggage: "30kg",
    meal: "Bữa trưa đầy đủ",
    wifi: true,
    entertainment: true,
  },
  {
    id: 3,
    departure_location: "Hồ Chí Minh",
    departure_time: "20:15",
    departure_airport: "Tân Sơn Nhất (SGN)",
    arrival_location: "Phú Quốc",
    arrival_time: "21:30",
    arrival_airport: "Phú Quốc (PQC)",
    departure_date: "20/12/2023",
    arrival_date: "21/12/2023",
    price: 2200000,
    duration: "1h 15m",
    type: "Tiết kiệm",
    baggage: "15kg",
    meal: "Không",
    wifi: false,
    entertainment: false,
  },
  {
    id: 4,
    departure_location: "Hải Phòng",
    departure_time: "06:45",
    departure_airport: "Cát Bi (HPH)",
    arrival_location: "Buôn Ma Thuột",
    arrival_time: "08:30",
    arrival_airport: "Buôn Ma Thuột (BMV)",
    departure_date: "20/12/2023",
    arrival_date: "21/12/2023",
    price: 3000000,
    duration: "1h 45m",
    type: "Thương gia",
    baggage: "40kg",
    meal: "Bữa sáng cao cấp",
    wifi: true,
    entertainment: true,
  },
];

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

// Add these functions to the existing flight interface file
export function saveDiscountInfoToLocalStorage(discountInfo: DiscountInfo) {
    localStorage.setItem('discountInfo', JSON.stringify(discountInfo));
}

export function getDiscountInfoFromLocalStorage(): DiscountInfo | null {
    const storedDiscount = localStorage.getItem('discountInfo');
    return storedDiscount ? JSON.parse(storedDiscount) : null;
}

export function clearDiscountInfoFromLocalStorage() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('discountInfo');
    }
}