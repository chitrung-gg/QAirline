import { Flight } from "./flight";
import { Promotion } from "./promotion";
import { User } from "./user";

export interface Booking {
  id: number;
  user?: User;
  flight: Flight;
  passengerName: string;
  passengerDob: string;
  passengerEmail: string;
  passportNumber: string;
  bookingCode?: string;
  promotion?: Promotion;
  ticketPrice: Record<string, number>;
  totalPrice: number;
  passengerNumber: number;
  seatNumber?: string; // no need
  seatClass: string;
  bookingDate: string;
  bookingStatus?: BookingStatus;
  paymentStatus?: PaymentStatus;
//   payments?: Payment[];
}

export enum BookingStatus {
    CONFIRMED = 'Confirmed',
    PENDING = 'Pending', // ?
    CANCELLED = 'Cancelled',
}

export enum PaymentStatus {
    PAID = 'Paid',
    PENDING = 'Pending', // no need
    UNPAID = 'Unpaid',
}

export interface CreateBookingDto {
  user?: User;
  flight: Flight;
  passengerName: string;
  passengerDob: string;
  passengerEmail: string;
  passportNumber: string;
  promotion?: Promotion;
  ticketPrice: Record<string, number>;
  totalPrice: number;
  passengerNumber: number;
  seatClass: string;
  bookingDate: string;
  bookingStatus?: BookingStatus;
  paymentStatus?: PaymentStatus;
  seatNumber?: string; // no need
//   payments?: Payment[];
}

export interface UpdateBookingDto extends Partial<CreateBookingDto> {}