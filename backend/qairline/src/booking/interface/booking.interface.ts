import { Flight } from "src/flight/entity/flight.entity"
import { Promotion } from "src/promotion/entity/promotion.entity"
import { User } from "src/user/entity/user.entity"

export interface Booking {
    id: number 
    user: User 
    flight: Flight 
    passengerName: string
    passengerDob: Date
    passportNumber: string
    ticketCode: string
    promotion: Promotion
    ticketPrice: number
    seatNumber: number
    seatClass: string
    bookingDate: Date
    bookingStatus: "Confirmed" | "Pending" | "Cancelled"
    paymentStatus: "Paid" | "Pending" | "Unpaid"
    paymentDate: Date
    cancelDate: Date;
}