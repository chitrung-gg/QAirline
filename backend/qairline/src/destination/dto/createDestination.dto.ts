import { IsNumber, IsString } from "class-validator";

export class CreateDestinationDto {
    @IsNumber()
    id: number

    @IsString()
    name: string; // Tên địa điểm (ví dụ: "Paris", "Tokyo Tower", "Grand Canyon")

    @IsString()
    description: string; // Mô tả chi tiết về địa điểm

    @IsString()
    image?: string; // URL hình ảnh của địa điểm

    @IsString()
    city: string; // Thành phố nơi có địa điểm (ví dụ: "Paris", "Tokyo")

    @IsString()
    country: string; // Quốc gia nơi có địa điểm (ví dụ: "France", "Japan")\\\\\\

    //   @IsNumber()
    //   popularityScore: number; // Điểm đánh giá hoặc độ phổ biến của địa điểm

    //   @IsISO8601()
    //   createdAt: string; // Thời gian địa điểm được thêm vào hệ thống

    //   @IsISO8601()
    //   updatedAt: string; // Thời gian cập nhật thông tin địa điểm

    //   @IsObject()
    //   recommendedBy: User; // Người dùng hoặc admin đã recommend địa điểm (nếu có)
}
