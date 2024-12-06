import { IsBoolean, IsIn, IsISO8601, IsNumber, IsString } from "class-validator";

export class CreateNewsDto {
    @IsNumber()
    id: number;

    @IsString()
    title: string; // Tiêu đề bài viết

    @IsString()
    content: string; // Nội dung bài viết

    @IsString()
    @IsIn(['Updates', 'Announcements', 'Tips'])
    category: 'Updates' | 'Announcements' | 'Tips'; 

    @IsString()
    coverImage?: string; // Đường dẫn ảnh bìa (nếu có)

    @IsBoolean()
    isPublished: boolean; // Trạng thái xuất bản

    @IsISO8601()
    createdAt: string; // Thời gian tạo bài viết

    @IsISO8601()
    updatedAt: string; // Thời gian cập nhật bài viết

    // @ManyToOne(() => User, (user) => user.news, { nullable: false, eager: true })
    // author: User; // Tác giả của bài viết
}
