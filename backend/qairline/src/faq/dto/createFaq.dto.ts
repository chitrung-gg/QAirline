import { IsBoolean, IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFaqDto {
    @ApiProperty({ description: 'Question of the FAQ', example: 'How do I book a flight?' })
    @IsString()
    question: string; // Câu hỏi thường gặp

    @ApiProperty({ description: 'Answer to the FAQ question', example: 'You can book a flight by visiting our website...' })
    @IsString()
    answer: string; // Câu trả lời cho câu hỏi

    @ApiProperty({ description: 'Category of the FAQ', example: 'Booking', required: false })
    @IsOptional()
    @IsString()
    category?: string; // Danh mục của câu hỏi (ví dụ: "Booking", "Payments")

    @ApiProperty({ description: 'Sort order for display', example: 1, required: false })
    @IsOptional()
    @IsNumber()
    sortOrder?: number; // Thứ tự sắp xếp hiển thị

    @ApiProperty({ description: 'Indicates if the FAQ is active', example: true, required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean; // Đánh dấu xem câu hỏi này có hiển thị không

    @ApiProperty({ description: 'Language of the FAQ', example: 'en', required: false })
    @IsOptional()
    @IsString()
    language?: string; // Ngôn ngữ của FAQ (ví dụ: "en" cho tiếng Anh, "vi" cho tiếng Việt)

    @ApiProperty({ description: 'Creation date of the FAQ', example: '2023-01-01T00:00:00Z', required: false })
    @IsOptional()
    @IsISO8601()
    createdAt?: string; // Ngày tạo câu hỏi

    @ApiProperty({ description: 'Last update date of the FAQ', example: '2023-01-01T00:00:00Z', required: false })
    @IsOptional()
    @IsISO8601()
    updatedAt?: string; // Ngày cập nhật câu hỏi
}
