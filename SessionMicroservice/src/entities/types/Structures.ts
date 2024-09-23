import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTypeEntity } from "../base/BaseTypeEntity";

@Entity('structures')
export class Structure extends BaseTypeEntity{
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

}