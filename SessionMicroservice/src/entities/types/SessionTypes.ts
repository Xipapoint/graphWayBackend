import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseSessionTypesEntity } from "../base/BaseSessionTypesEntity";

@Entity('sessionTypes')
export class SessionTypes extends BaseSessionTypesEntity{

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;


}