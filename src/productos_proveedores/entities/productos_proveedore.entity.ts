import { Producto } from "src/productos/entities/producto.entity";
import { Proveedore } from "src/proveedores/entities/proveedore.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductosProveedore {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => Proveedore,
        (Proveedore) => Proveedore.products_suppliers
    )
    id_suppliers: Proveedore

    @ManyToOne(
        () => Producto,
        (Producto) => Producto.products_suppliers
    )
    id_products: Producto
}
