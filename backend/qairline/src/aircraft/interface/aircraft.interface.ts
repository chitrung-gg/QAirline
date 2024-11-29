export interface Aircraft {
    id: number
    aircraftCode: string
    model: string
    manufacturer: string
    capacity: number
    seat_classes: {}
    status: "Active" | "Maintenance" | "Retired"
    created_at: Date
    updated_at: Date
}