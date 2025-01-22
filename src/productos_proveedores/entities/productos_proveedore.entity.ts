import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductosProveedore {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // cod_prod
    // cod_prov
}
