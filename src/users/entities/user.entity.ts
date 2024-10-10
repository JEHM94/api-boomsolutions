import { Column, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: 'user' })
    role: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
