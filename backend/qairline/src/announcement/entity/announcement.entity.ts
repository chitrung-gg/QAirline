import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Announcement {
    @PrimaryGeneratedColumn()
    announcement_id: number; // Khóa chính

    @Column({ type: "varchar", length: 255 })
    title: string; // Tiêu đề của thông báo

    @Column({ type: "text" })
    content: string; // Nội dung thông báo

    @Column({
        type: "enum",
        enum: ["News", "Promo", "Alert"],
        default: "News",
    })
    type: "News" | "Promo" | "Alert"; // Loại thông báo

    @Column({ type: "boolean", default: true })
    is_active: boolean; // Trạng thái hiển thị

    @Column({ type: "timestamp", nullable: true })
    start_date: Date | null; // Ngày bắt đầu áp dụng

    @Column({ type: "timestamp", nullable: true })
    end_date: Date | null; // Ngày kết thúc áp dụng

    @CreateDateColumn()
    created_at: Date; // Thời gian tạo

    @UpdateDateColumn()
    updated_at: Date; // Thời gian cập nhật
}
