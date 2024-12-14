export interface Aircraft {
    id: number
    aircraftCode: string
    model: string
    manufacturer: string
    capacity: number
    seatClasses: {}
    status: "Active" | "Maintenance" | "Retired"
    createdAt: Date
    updatedAt: Date
}