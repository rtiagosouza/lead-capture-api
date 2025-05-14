import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true, type: 'varchar' })
    phone: string | null;

    @Column()
    ip: string;

    @Column({ name: 'utm_source', nullable: true, type: 'varchar' })
    utmSource: string | null;

    @Column({ name: 'utm_medium', nullable: true, type: 'varchar' })
    utmMedium: string | null;

    @Column({ name: 'utm_campaign', nullable: true, type: 'varchar' })
    utmCampaign: string | null;

    @Column({ name: 'utm_content', nullable: true, type: 'varchar' })
    utmContent: string | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
