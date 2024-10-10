
import { Column, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: "double" })
    price: number;

    @Column()
    stock: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
