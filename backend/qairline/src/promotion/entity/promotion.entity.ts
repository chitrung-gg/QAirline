import { Booking } from "src/booking/entity/booking.entity";
import { OneToOne } from "typeorm";

export class Promotion {
    @OneToOne(() => Booking, (booking: Booking) => booking.id)
    booking: Booking

    // Implements more ...
}
