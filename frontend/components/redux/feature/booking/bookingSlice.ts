import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Flight } from "@/interfaces/flight";
import { Booking, BookingStatus } from "@/interfaces/booking";
import { api } from "@/utils/api/config";

export interface PassengerInfo {
  fullName: string;
  email: string;
  passportNumber: string;
  dateOfBirth: string;
}

export interface BookingSearchState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
}

export interface BookingCreateState {
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
  promotionCode?: string;
  discountAmount?: number;
}

const initialSearchState: BookingSearchState = {
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
};

const initialCreateState: BookingCreateState = {
  searchParams: {
    departure: "",
    destination: "",
    departureDate: "",
    passengers: 1,
    tripType: "mot-chieu",
  },
};

// Async thunks for booking operations
export const fetchBookingByCode = createAsyncThunk(
  "booking/fetchByCode",
  async (bookingCode: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Booking>(`/booking/${bookingCode}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Không tìm thấy booking");
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "booking/cancel",
  async (bookingId: number, { rejectWithValue }) => {
    try {
      const response = await api.put<Booking>(
        `/api/booking/${bookingId}/cancel`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Hủy booking thất bại");
    }
  }
);

export const bookingSearchSlice = createSlice({
  name: "bookingSearch",
  initialState: initialSearchState,
  reducers: {
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Booking
      .addCase(fetchBookingByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload;
      })
      .addCase(fetchBookingByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedBooking) {
          state.selectedBooking.bookingStatus = BookingStatus.CANCELLED;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const bookingCreateSlice = createSlice({
  name: "bookingCreate",
  initialState: initialCreateState,
  reducers: {
    setSearchParams: (
      state,
      action: PayloadAction<Partial<BookingCreateState["searchParams"]>>
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
      action: PayloadAction<BookingCreateState["bookingConfirmation"]>
    ) => {
      state.bookingConfirmation = action.payload;
    },
    resetBooking: () => initialCreateState,
    setPromotionCode: (
      state,
      action: PayloadAction<{
        code: string;
        discountAmount: number;
      }>
    ) => {
      state.promotionCode = action.payload.code;
      state.discountAmount = action.payload.discountAmount;
    },
  },
});

export const {
  clearSelectedBooking,
} = bookingSearchSlice.actions;
export const {
  setSearchParams,
  setSelectedFlight,
  setPassengerInfo,
  setBookingConfirmation,
  resetBooking,
  setPromotionCode,
} = bookingCreateSlice.actions;

export const bookingSearchReducer = bookingSearchSlice.reducer;
export const bookingCreateReducer = bookingCreateSlice.reducer;
