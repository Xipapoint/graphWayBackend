import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseSessionTypesEntity } from "../base/BaseSessionTypesEntity";

@Entity('sessinStructures')
export class SessionStructures extends BaseSessionTypesEntity{
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

}