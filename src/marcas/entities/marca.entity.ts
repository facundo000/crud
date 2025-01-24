import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marca {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    name: string

    @OneToMany(
        () => Producto,
        (Producto) => Producto.id_brand,
        { cascade: true }
    )
    Products: Producto
}

