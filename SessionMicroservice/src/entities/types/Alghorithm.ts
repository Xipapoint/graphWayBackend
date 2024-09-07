import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseSessionTypesEntity } from "../base/BaseSessionTypesEntity";

@Entity('alghorithms')
export class Alghorithm extends BaseSessionTypesEntity{

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}