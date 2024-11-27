import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column()  
    token: string;

    @Column()
    userId: number
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
    expiryDate: Date;
}
