import { IsBoolean, IsISO8601, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePolicyDto {
    @ApiProperty({ description: 'Title of the policy', example: 'Privacy Policy' })
    @IsString()
    title: string; // Tiêu đề của chính sách (ví dụ: "Privacy Policy", "Cancellation Policy")

    @ApiProperty({ description: 'Content of the policy', example: 'This policy explains how we handle your data...' })
    @IsString()
    content: string; // Nội dung chính sách chi tiết

    @ApiProperty({ description: 'Category of the policy', example: 'Privacy', required: false })
    @IsOptional()
    @IsString()
    category?: string; // Danh mục chính sách (ví dụ: "Privacy", "Terms", "Booking")

    @ApiProperty({ description: 'Indicates if the policy is active', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean; // Đánh dấu xem chính sách có hiển thị cho người dùng không

    @ApiProperty({ description: 'Language of the policy', example: 'en', required: false })
    @IsOptional()
    @IsString()
    language?: string; // Ngôn ngữ của chính sách (ví dụ: "en" cho tiếng Anh, "vi" cho tiếng Việt)

    @ApiProperty({ description: 'Creation date of the policy', example: '2023-01-01T00:00:00Z', required: false })
    @IsOptional()
    @IsISO8601()
    createdAt?: string; // Thời gian tạo chính sách

    @ApiProperty({ description: 'Last update date of the policy', example: '2023-01-01T00:00:00Z', required: false })
    @IsOptional()
    @IsISO8601()
    updatedAt?: string; // Thời gian cập nhật chính sách
}
