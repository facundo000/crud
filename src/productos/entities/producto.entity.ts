import { Marca } from "src/marcas/entities/marca.entity";
import { ProductosProveedore } from "src/productos_proveedores/entities/productos_proveedore.entity";
import { Rubro } from "src/rubros/entities/rubro.entity";
import { Column, Entity, ManyToOne, NumericType, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    cod_product: string;

    @Column('text')
    description: string

    @ManyToOne(
        () => Marca,
        (Marca) => Marca.Products

    )
    brand: Marca

    @ManyToOne(
        () => Rubro,
        (Rubro) => Rubro.products
    )
    category: Rubro

    @OneToMany(
        () => ProductosProveedore,
        (ProductosProveedore) => ProductosProveedore.products,
        { cascade: true }
    )
    products_suppliers: ProductosProveedore

    @Column('money', {
        default: 0, nullable: false
    })    
    price: NumericType;
}
