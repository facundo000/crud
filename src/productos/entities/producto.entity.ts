import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    cod_product: string;

    @Column('text')
    description: string

    // marca
    // rubro

    @Column('numeric', {
        default: 0
    })    
    price: number;
}
