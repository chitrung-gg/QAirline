import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Aboutus {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'category of the About Us section', enum: ["Achievement", "Intro", "OurValue", "OurVision"] })
    @Column({
      type: "enum",
      enum: ["Achievement", "Intro", "OurValue", "OurVision"]
    })
    category: "Achievement" | "Intro" | "OurValue" | "OurVision"; // Tiêu đề của phần "About Us" 

    @ApiProperty({ description: 'Title of the About Us section', example: 'Our Mission' })
    @Column({ type: "varchar", length: 255 })
    title: string; // Tiêu đề của phần "About Us" (ví dụ: "Our Mission", "Who We Are")

    @ApiProperty({ description: 'Content of the About Us section', example: 'We are committed to providing the best service...' })
    @Column({ type: "text", array: true })
    content: string[]; // Nội dung mô tả chi tiết (ví dụ: thông tin công ty, sứ mệnh, tầm nhìn)

    @ApiProperty({ description: 'Image URL for the About Us section', example: 'http://example.com/image.jpg', nullable: true })
    @Column({ type: "text", array: true, nullable: true })
    image?: string[]; // URL của hình ảnh minh họa (nếu có)

    @ApiProperty({ description: 'Indicates if the About Us section is active', example: true })
    @Column({ type: "boolean", default: true })
    isActive?: boolean; // Đánh dấu xem phần này có được hiển thị trên trang web hay không

    @ApiProperty({ description: 'Creation date of the About Us section', example: '2023-01-01T00:00:00Z' })
    @CreateDateColumn({
        type: 'timestamp',
        // transformer: {
        //   to: (value: string | Date | null) => {
        //     if (value === null) return null;
        //     return new Date(value).toISOString();
        //   },
        //   from: (value: Date) => {
        //     return value ? value.toISOString() : null;
        //   },
        // },
        default: () => "CURRENT_TIMESTAMP"
      })
    createdAt?: string; // Thời gian tạo mục About Us

    @ApiProperty({ description: 'Last update date of the About Us section', example: '2023-01-01T00:00:00Z' })
    @UpdateDateColumn({
        type: 'timestamp',
        // transformer: {
        //   to: (value: string | Date | null) => {
        //     if (value === null) return null;
        //     return new Date(value).toISOString();
        //   },
        //   from: (value: Date) => {
        //     return value ? value.toISOString() : null;
        //   },
        // },
        default: () => "CURRENT_TIMESTAMP"
      })
    updatedAt?: string; // Thời gian cập nhật mục About Us
}
