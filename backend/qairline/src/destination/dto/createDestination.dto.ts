import { IsNumber, IsString, IsISO8601, IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entity/user.entity";

export class CreateDestinationDto {
    @ApiProperty({ description: 'ID of the destination', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({ description: 'Name of the destination', example: 'Paris' })
    @IsString()
    name: string; // Tên địa điểm (ví dụ: "Paris", "Tokyo Tower", "Grand Canyon")

    @ApiProperty({ description: 'Description of the destination', example: 'A beautiful city with rich history.' })
    @IsString()
    description: string; // Mô tả chi tiết về địa điểm

    @ApiProperty({ description: 'Image URL of the destination', example: 'http://example.com/image.jpg', required: false })
    @IsString()
    image?: string; // URL hình ảnh của địa điểm

    @ApiProperty({ description: 'City where the destination is located', example: 'Paris' })
    @IsString()
    city: string; // Thành phố nơi có địa điểm (ví dụ: "Paris", "Tokyo")

    @ApiProperty({ description: 'Country where the destination is located', example: 'France' })
    @IsString()
    country: string; // Quốc gia nơi có địa điểm (ví dụ: "France", "Japan")

    // @ApiProperty({ description: 'Popularity score of the destination', example: 95 })
    // @IsNumber()
    // popularityScore: number; // Điểm đánh giá hoặc độ phổ biến của địa điểm

    // @ApiProperty({ description: 'Creation date of the destination', example: '2023-01-01T00:00:00Z' })
    // @IsISO8601()
    // createdAt: string; // Thời gian địa điểm được thêm vào hệ thống

    // @ApiProperty({ description: 'Last update date of the destination', example: '2023-01-01T00:00:00Z' })
    // @IsISO8601()
    // updatedAt: string; // Thời gian cập nhật thông tin địa điểm

    // @ApiProperty({ description: 'User who recommended the destination', type: () => User, required: false })
    // @IsObject()
    // recommendedBy: User; // Người dùng hoặc admin đã recommend địa điểm (nếu có)
}
