import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseTypeEntity } from "../base/BaseTypeEntity";

@Entity('alghorithms')
export class Alghorithm extends BaseTypeEntity{

    @Column()
    isDirected: boolean;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}