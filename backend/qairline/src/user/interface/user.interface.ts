import { Booking } from "src/booking/entity/booking.entity";

export interface User {
    id: number
    email: string;
    username: string
    password: string
    phoneNumber: string
    firstName: string; 
    lastName: string; 
    dob: Date; 
    gender: string; 
    address: string; 
    passportNumber: string; 
    role: 'User' | 'Admin' | 'Staff'
    status: 'Active' | 'Inactive' | 'Banned'; 
    bookings: Booking[];
    // payments: Payment[];
    currentHashedRefreshToken?: string;
}