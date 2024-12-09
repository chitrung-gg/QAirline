import { IsBoolean, IsIn, IsISO8601, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entity/user.entity";

export class CreateNewsDto {
    @ApiProperty({ description: 'Title of the news article', example: 'New Feature Release' })
    @IsString()
    title: string; // Tiêu đề bài viết

    @ApiProperty({ description: 'Content of the news article', example: 'We are excited to announce a new feature...' })
    @IsString()
    content: string; // Nội dung bài viết

    @ApiProperty({ description: 'Category of the news article', enum: ['Updates', 'Announcements', 'Tips'], example: 'Updates' })
    @IsString()
    @IsIn(['Updates', 'Announcements', 'Tips'])
    category: 'Updates' | 'Announcements' | 'Tips'; 

    @ApiProperty({ description: 'Cover image URL of the news article', example: 'http://example.com/image.jpg', required: false })
    @IsString()
    coverImage?: string; // Đường dẫn ảnh bìa (nếu có)

    @ApiProperty({ description: 'Publication status of the news article', example: true })
    @IsBoolean()
    isPublished: boolean; // Trạng thái xuất bản

    @ApiProperty({ description: 'Creation date of the news article', example: '2023-01-01T00:00:00Z' })
    @IsISO8601()
    createdAt: string; // Thời gian tạo bài viết

    @ApiProperty({ description: 'Last update date of the news article', example: '2023-01-01T00:00:00Z' })
    @IsISO8601()
    updatedAt: string; // Thời gian cập nhật bài viết

    // @ApiProperty({ description: 'Author of the news article', type: () => User })
    // @ManyToOne(() => User, (user) => user.news, { nullable: false, eager: true })
    // author: User; // Tác giả của bài viết
}
