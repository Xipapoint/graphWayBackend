import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseSessionTypesEntity } from "../base/BaseSessionTypesEntity";

@Entity('session-types')
export class SessionTypes extends BaseSessionTypesEntity{

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;


}