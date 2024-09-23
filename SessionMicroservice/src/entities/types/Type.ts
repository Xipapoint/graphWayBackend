import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseTypeEntity } from "../base/BaseTypeEntity";

@Entity('session-types')
export class Type extends BaseTypeEntity{

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;


}