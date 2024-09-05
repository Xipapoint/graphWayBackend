import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('alghorithms')
export class Alghorithm{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    alghorithmName: string

    @Column()
    alghorithmImagePath: string

    @Column()
    alghorithmDescription: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}