import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marca {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    name: string

    
}

