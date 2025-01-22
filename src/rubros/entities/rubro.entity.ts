import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rubro {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name: string
}
