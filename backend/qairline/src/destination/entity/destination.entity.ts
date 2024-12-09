import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/user/entity/user.entity"; // If destinations can be added or recommended by users
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Destination {
  @ApiProperty({ description: 'Primary Key', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Name of the destination', example: 'Paris' })
  @Column({ type: "varchar", length: 100 })
  name: string; // Tên địa điểm (ví dụ: "Paris", "Tokyo Tower", "Grand Canyon")

  @ApiProperty({ description: 'Description of the destination', example: 'A beautiful city with rich history.', nullable: true })
  @Column({ type: "text", nullable: true })
  description: string; // Mô tả chi tiết về địa điểm

  @ApiProperty({ description: 'Image URL of the destination', example: 'http://example.com/image.jpg', nullable: true })
  @Column({ type: "varchar", length: 255, nullable: true })
  image?: string; // URL hình ảnh của địa điểm

  @ApiProperty({ description: 'City where the destination is located', example: 'Paris' })
  @Column({ type: "varchar", length: 100 })
  city: string; // Thành phố nơi có địa điểm (ví dụ: "Paris", "Tokyo")

  @ApiProperty({ description: 'Country where the destination is located', example: 'France' })
  @Column({ type: "varchar", length: 100 })
  country: string; // Quốc gia nơi có địa điểm (ví dụ: "France", "Japan")

  // @ApiProperty({ description: 'Popularity score of the destination', example: 95 })
  // @Column({ type: "int", default: 0 })
  // popularityScore: number; // Điểm đánh giá hoặc độ phổ biến của địa điểm

  // @ApiProperty({ description: 'Creation date of the destination', example: '2023-01-01T00:00:00Z' })
  // @CreateDateColumn()
  // createdAt: Date; // Thời gian địa điểm được thêm vào hệ thống

  // @ApiProperty({ description: 'Last update date of the destination', example: '2023-01-01T00:00:00Z' })
  // @UpdateDateColumn()
  // updatedAt: Date; // Thời gian cập nhật thông tin địa điểm

  // @ApiProperty({ description: 'User who recommended the destination', type: () => User, nullable: true })
  // @ManyToOne(() => User, (user) => user.recommendedDestinations, { nullable: true })
  // recommendedBy: User; // Người dùng hoặc admin đã recommend địa điểm (nếu có)
}
