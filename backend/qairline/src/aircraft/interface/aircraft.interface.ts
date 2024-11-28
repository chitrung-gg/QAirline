export interface Aircraft {
    aircraft_id: number
    aircraft_code: string
    model: string
    manufacturer: string
    capacity: number
    seat_classes: {}
    created_at: Date
    updated_at: Date
}