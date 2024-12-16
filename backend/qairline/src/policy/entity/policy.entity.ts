import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Policy {
    @ApiProperty({ description: 'Primary Key', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Title of the policy', example: 'Privacy Policy' })
    @Column({ type: "varchar", length: 255 })
    title: string; // Tiêu đề của chính sách (ví dụ: "Privacy Policy", "Cancellation Policy")

    // @ApiProperty({ description: 'Content of the policy', example: 'This policy explains how we handle your data...' })
    // @Column({ type: "text" })
    // content: string; // Nội dung chính sách chi tiết

    @ApiProperty({
      description: 'Tree structure of sections and subsections',
      example: '{ "sections": [{ "title": "1.1 Hành lý bị hỏng", "content": "...", "subsections": [...] }] }'
    })
    @Column({ type: "jsonb", nullable: true })
    treeContent: Record<string, any>; // Using Record<string, any> instead of object

    @ApiProperty({ description: 'Category of the policy', example: 'Privacy', nullable: true })
    @Column({ type: "varchar", length: 100, nullable: true })
    category?: string; // Danh mục chính sách (ví dụ: "Privacy", "Terms", "Booking")

    @ApiProperty({ description: 'Indicates if the policy is active', example: true })
    @Column({ type: "boolean", default: true })
    isActive?: boolean; // Đánh dấu xem chính sách có hiển thị cho người dùng không

    @ApiProperty({ description: 'Language of the policy', example: 'en' })
    @Column({ type: "varchar", length: 10, default: "vi" })
    language?: string; // Ngôn ngữ của chính sách (ví dụ: "en" cho tiếng Anh, "vi" cho tiếng Việt)

    @ApiProperty({ description: 'Creation date of the policy', example: '2023-01-01T00:00:00Z' })
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
    createdAt?: string; // Thời gian tạo chính sách

    @ApiProperty({ description: 'Last update date of the policy', example: '2023-01-01T00:00:00Z' })
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
    updatedAt?: string; // Thời gian cập nhật chính sách
}
