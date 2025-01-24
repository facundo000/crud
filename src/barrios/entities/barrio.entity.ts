import { Proveedore } from "src/proveedores/entities/proveedore.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Barrio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true        
    })
    name: string

    @OneToMany(
        (type) => Proveedore,
        (Proveedore) => Proveedore.id_neighborhood,
        { cascade: true }
    )
    suppliers: Proveedore
}
