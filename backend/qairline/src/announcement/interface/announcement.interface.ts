export interface Announcement {
    announcement_id: number
    title: string
    content: string
    type: "News" | "Promo" | "Alert"
    is_active: boolean
    start_date: Date | null
    end_date: Date | null
    created_at: Date
    updated_at: Date;
}