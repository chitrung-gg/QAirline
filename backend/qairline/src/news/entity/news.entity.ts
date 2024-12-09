import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/user/entity/user.entity";

@Entity()
export class News {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Title of the news article', example: 'New Feature Release' })
    @Column({ type: "varchar", length: 255 })
    title: string; // Tiêu đề bài viết

    @ApiProperty({ description: 'Content of the news article', example: 'We are excited to announce a new feature...' })
    @Column({ type: "text" })
    content: string; // Nội dung bài viết

    @ApiProperty({ description: 'Category of the news article', enum: ['Updates', 'Announcements', 'Tips'], example: 'Updates' })
    @Column({
      type: "enum",
      enum: ['Updates', 'Announcements', 'Tips'],
      default: "Announcements",
    })
    category: 'Updates' | 'Announcements' | 'Tips'; // Danh mục (Ví dụ: Updates, Promotions, Announcements, Tips)

    @ApiProperty({ description: 'Cover image URL of the news article', example: 'http://example.com/image.jpg', nullable: true })
    @Column({ type: "varchar", length: 255, nullable: true })
    coverImage?: string; // Đường dẫn ảnh bìa (nếu có)

    @ApiProperty({ description: 'Publication status of the news article', example: true })
    @Column({ type: "boolean", default: true })
    isPublished: boolean; // Trạng thái xuất bản

    @ApiProperty({ description: 'Creation date of the news article', example: '2023-01-01T00:00:00Z' })
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

    @ApiProperty({ description: 'Last update date of the news article', example: '2023-01-01T00:00:00Z' })
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

    // @ApiProperty({ description: 'Author of the news article', type: () => User })
    // @ManyToOne(() => User, (user) => user.news, { nullable: false, eager: true })
    // author: User; // Tác giả của bài viết
}
