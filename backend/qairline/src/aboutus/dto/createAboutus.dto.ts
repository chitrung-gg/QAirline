import { IsBoolean, IsISO8601, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAboutusDto {
    @ApiProperty({ description: 'Title of the About Us section', example: 'Our Mission' })
    @IsString()
    title: string; // Tiêu đề của phần "About Us" (ví dụ: "Our Mission", "Who We Are")

    @ApiProperty({ description: 'Content of the About Us section', example: 'We are committed to providing the best service...' })
    @IsString()
    content: string; // Nội dung mô tả chi tiết (ví dụ: thông tin công ty, sứ mệnh, tầm nhìn)

    @ApiProperty({ description: 'Image URL for the About Us section', example: 'http://example.com/image.jpg', required: false })
    @IsOptional()
    @IsString()
    image?: string; // URL của hình ảnh minh họa (nếu có)

    @ApiProperty({ description: 'Indicates if the About Us section is active', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean; // Đánh dấu xem phần này có được hiển thị trên trang web hay không

    @ApiProperty({ description: 'Creation date of the About Us section', example: '2023-01-01T00:00:00Z', required: false })
    @IsOptional()
    @IsISO8601()
    createdAt?: string; // Thời gian tạo mục About Us

    @ApiProperty({ description: 'Last update date of the About Us section', example: '2023-01-01T00:00:00Z', required: false })
    @IsOptional()
    @IsISO8601()
    updatedAt?: string; // Thời gian cập nhật mục About Us
}
