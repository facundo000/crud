import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proveedore {
    @PrimaryGeneratedColumn('uuid')
    cod_prov: string;

    @Column('text')
    name: string;

    @Column()
    direction: string

    // id_barrio

    @Column('number')
    phone: number

    @Column()
    mail: string
}
