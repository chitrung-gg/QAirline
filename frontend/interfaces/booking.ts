import { Flight } from "./flight";
import { Promotion } from "./promotion";
import { User } from "./user";

export interface Booking {
  id: number;
  user?: User;
  flight?: Flight;
  passengerName: string;
  passengerDob: string;
  passportNumber: string;
  bookingCode?: string;
  promotion?: Promotion;
  ticketPrice: Record<string, number>;
  seatNumber: string;
  seatClass: string;
  bookingDate: string;
  bookingStatus?: BookingStatus;
  paymentStatus?: PaymentStatus;
//   payments?: Payment[];
}

export enum BookingStatus {
    CONFIRMED = 'Confirmed',
    PENDING = 'Pending',
    CANCELLED = 'Cancelled',
}

export enum PaymentStatus {
    PAID = 'Paid',
    PENDING = 'Pending',
    UNPAID = 'Unpaid',
}
