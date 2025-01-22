import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Barrio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true        
    })
    name: string
}
