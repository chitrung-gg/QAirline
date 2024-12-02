import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/user/entity/user.entity"; // If destinations can be added or recommended by users

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string; // Tên địa điểm (ví dụ: "Paris", "Tokyo Tower", "Grand Canyon")

  @Column({ type: "text", nullable: true })
  description: string; // Mô tả chi tiết về địa điểm

  @Column({ type: "varchar", length: 255, nullable: true })
  image?: string; // URL hình ảnh của địa điểm

  @Column({ type: "varchar", length: 100})
  city: string; // Thành phố nơi có địa điểm (ví dụ: "Paris", "Tokyo")

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
