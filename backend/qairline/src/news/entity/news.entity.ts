import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    title: string; // Tiêu đề bài viết

    @Column({ type: "text" })
    content: string; // Nội dung bài viết

    @Column({
      type: "enum",
      enum: ['Updates', 'Promotions', 'Announcements', 'Tips'],
      default: "Announcements",
    })
    category: 'Updates' | 'Promotions' | 'Announcements' | 'Tips'; // Danh mục (Ví dụ: Updates, Promotions, Announcements, Tips)

    @Column({ type: "varchar", length: 255, nullable: true })
    coverImage?: string; // Đường dẫn ảnh bìa (nếu có)

    @Column({ type: "boolean", default: true })
    isPublished: boolean; // Trạng thái xuất bản

    @CreateDateColumn({
      type: 'timestamptz',
      transformer: {
        to: (value: string | Date | null) => {
          if (value === null) return null;
          return new Date(value).toISOString();
        },
        from: (value: Date) => {
          return value ? value.toISOString() : null;
        },
      },
    })
    createdAt: string; // Thời gian tạo bài viết

    @UpdateDateColumn({
      type: 'timestamptz',
      transformer: {
        to: (value: string | Date | null) => {
          if (value === null) return null;
          return new Date(value).toISOString();
        },
        from: (value: Date) => {
          return value ? value.toISOString() : null;
        },
      },
    })
    updatedAt: string; // Thời gian cập nhật bài viết

    // @ManyToOne(() => User, (user) => user.news, { nullable: false, eager: true })
    // author: User; // Tác giả của bài viết
}
