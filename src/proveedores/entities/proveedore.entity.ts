import { Barrio } from "src/barrios/entities/barrio.entity";
import { ProductosProveedore } from "src/productos_proveedores/entities/productos_proveedore.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proveedore {
    @PrimaryGeneratedColumn('uuid')
    cod_prov: string;

    @Column('text', {
        nullable: false
    })
    name: string;

    @Column()
    direction: string

    @ManyToOne(
        (type) => Barrio,
        (Barrio) => Barrio.suppliers
    )
    neighborhood: Barrio

    @OneToMany(
        () => ProductosProveedore,
        (ProductosProveedore) => ProductosProveedore.suppliers,
        { cascade: true }
    )
    products_suppliers: ProductosProveedore

    @Column('text')
    phone: string

    @Column()
    mail: string
}
