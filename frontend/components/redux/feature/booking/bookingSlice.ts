import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Flight } from "@/interfaces/flight";

export interface PassengerInfo {
  fullName: string;
  email: string;
    passportNumber: string;
    dateOfBirth: string;
}

export interface BookingState {
  searchParams: {
    departure: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    tripType: "mot-chieu" | "khu-hoi";
  };
  selectedFlight?: Flight;
  passengerInfo?: PassengerInfo;
  bookingConfirmation?: {
    bookingId: string;
    status: string;
  };
}

const initialState: BookingState = {
  searchParams: {
    departure: "",
    destination: "",
    departureDate: "",
    passengers: 1,
    tripType: "mot-chieu",
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSearchParams: (
      state,
      action: PayloadAction<Partial<BookingState["searchParams"]>>
    ) => {
      state.searchParams = { ...state.searchParams, ...action.payload };
    },
    setSelectedFlight: (state, action: PayloadAction<Flight>) => {
      state.selectedFlight = action.payload;
    },
    setPassengerInfo: (state, action: PayloadAction<PassengerInfo>) => {
      state.passengerInfo = action.payload;
    },
    setBookingConfirmation: (
      state,
      action: PayloadAction<BookingState["bookingConfirmation"]>
    ) => {
      state.bookingConfirmation = action.payload;
    },
    resetBooking: () => initialState,
  },
});

export const {
  setSearchParams,
  setSelectedFlight,
  setPassengerInfo,
  setBookingConfirmation,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
