import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class News {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ type: "varchar", length: 255 })
    title: string; // Tiêu đề bài viết

    @ApiProperty()
    @Column({ type: "text" })
    content: string; // Nội dung bài viết

    @ApiProperty()
    @Column({
      type: "enum",
      enum: ['Updates', 'Announcements', 'Tips'],
      default: "Announcements",
    })
    category: 'Updates' | 'Announcements' | 'Tips'; // Danh mục (Ví dụ: Updates, Promotions, Announcements, Tips)

    @ApiProperty()
    @Column({ type: "varchar", length: 255, nullable: true })
    coverImage?: string; // Đường dẫn ảnh bìa (nếu có)

    @ApiProperty()
    @Column({ type: "boolean", default: true })
    isPublished: boolean; // Trạng thái xuất bản

    @ApiProperty()
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

    @ApiProperty()
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
