export interface Booking {
    booking_id: number // (Primary Key)
    user_id: number // (liên kết với bảng người dùng)
    flight_id: number // (liên kết với bảng chuyến bay)
    passenger_name: string
    passenger_dob: Date
    passport_number: string
    ticket_code: string
    ticket_price: number
    seat_number: number
    seat_class: string
    booking_date: Date
    booking_status: 'Purchased' | 'Waiting' | 'Cancelled'
    // payment_status: 'Paid'
    total_amount: number
    promo_code: string
    payment_date: Date
}