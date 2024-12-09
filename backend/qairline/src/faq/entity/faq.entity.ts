import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Faq {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Question of the FAQ', example: 'How do I book a flight?' })
    @Column({ type: "varchar", length: 255 })
    question: string; // Câu hỏi thường gặp

    @ApiProperty({ description: 'Answer to the FAQ question', example: 'You can book a flight by visiting our website...' })
    @Column({ type: "text" })
    answer: string; // Câu trả lời cho câu hỏi

    @ApiProperty({ description: 'Category of the FAQ', example: 'Booking', nullable: true })
    @Column({ type: "varchar", length: 100, nullable: true })
    category?: string; // Danh mục của câu hỏi (ví dụ: "Booking", "Payments")

    @ApiProperty({ description: 'Sort order for display', example: 1, nullable: true })
    @Column({ type: "int", default: 0 })
    sortOrder?: number; // Thứ tự sắp xếp hiển thị

    @ApiProperty({ description: 'Indicates if the FAQ is active', example: true })
    @Column({ type: "boolean", default: true })
    isActive?: boolean; // Đánh dấu xem câu hỏi này có hiển thị không

    @ApiProperty({ description: 'Language of the FAQ', example: 'en' })
    @Column({ type: "varchar", length: 10, default: "vi" })
    language?: string; // Ngôn ngữ của FAQ (ví dụ: "en" cho tiếng Anh, "vi" cho tiếng Việt)

    @ApiProperty({ description: 'Creation date of the FAQ', example: '2023-01-01T00:00:00Z' })
    @CreateDateColumn({
        type: 'timestamptz',
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
    createdAt?: string; // Ngày tạo câu hỏi

    @ApiProperty({ description: 'Last update date of the FAQ', example: '2023-01-01T00:00:00Z' })
    @UpdateDateColumn({
        type: 'timestamptz',
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
    updatedAt?: string; // Ngày cập nhật câu hỏi
}
