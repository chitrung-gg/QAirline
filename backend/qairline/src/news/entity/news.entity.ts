import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    title: string; // Tiêu đề bài viết

    @Column({ type: "text" })
    content: string; // Nội dung bài viết

    @Column({ type: "varchar", length: 100, nullable: true })
    category: string; // Danh mục (Ví dụ: Updates, Promotions, Announcements, Tips)

    @Column({ type: "varchar", length: 255, nullable: true })
    coverImage?: string; // Đường dẫn ảnh bìa (nếu có)

    @Column({ type: "boolean", default: true })
    isPublished: boolean; // Trạng thái xuất bản

    @CreateDateColumn({ type: 'timestamptz', transformer: {
        to: (value: string | Date) => new Date(value), // Convert ISO string to Date for database
        from: (value: Date) => value.toISOString(),   // Convert Date to ISO string when retrieving
      } })
    createdAt: string; // Thời gian tạo bài viết

    @UpdateDateColumn({ type: 'timestamptz', transformer: {
        to: (value: string | Date) => new Date(value),
        from: (value: Date) => value.toISOString(),
      } })
    updatedAt: string; // Thời gian cập nhật bài viết

    // @ManyToOne(() => User, (user) => user.news, { nullable: false, eager: true })
    // author: User; // Tác giả của bài viết
}
