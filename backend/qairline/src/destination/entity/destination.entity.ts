import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/user/entity/user.entity"; // If destinations can be added or recommended by users
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Destination {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: "varchar", length: 100 })
  name: string; // Tên địa điểm (ví dụ: "Paris", "Tokyo Tower", "Grand Canyon")

  @ApiProperty()
  @Column({ type: "text", nullable: true })
  description: string; // Mô tả chi tiết về địa điểm

  @ApiProperty()
  @Column({ type: "varchar", length: 255, nullable: true })
  image?: string; // URL hình ảnh của địa điểm

  @ApiProperty()
  @Column({ type: "varchar", length: 100})
  city: string; // Thành phố nơi có địa điểm (ví dụ: "Paris", "Tokyo")

  @ApiProperty()
  @Column({ type: "varchar", length: 100})
  country: string; // Quốc gia nơi có địa điểm (ví dụ: "France", "Japan")\\\\\\

//   @Column({ type: "int", default: 0 })
//   popularityScore: number; // Điểm đánh giá hoặc độ phổ biến của địa điểm

//   @CreateDateColumn()
//   createdAt: Date; // Thời gian địa điểm được thêm vào hệ thống

//   @UpdateDateColumn()
//   updatedAt: Date; // Thời gian cập nhật thông tin địa điểm

//   @ManyToOne(() => User, (user) => user.recommendedDestinations, { nullable: true })
//   recommendedBy: User; // Người dùng hoặc admin đã recommend địa điểm (nếu có)
}
