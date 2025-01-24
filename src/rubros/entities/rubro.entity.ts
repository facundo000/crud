import { Producto } from "src/productos/entities/producto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rubro {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name: string

    @OneToMany(
        () => Producto,
        (Producto) => Producto.id_category,
        {cascade:true}
    )
    products: Producto
}
