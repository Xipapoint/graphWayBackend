import { Column, Entity, OneToMany } from "typeorm";
import { BaseSessionEntity } from "../base/BaseSessionEntity";
import { Vertex } from "../structures/base/Vertex";
import { Structure } from "../types/Structures";

@Entity('tree-sessions')
export class TreeSessions extends BaseSessionEntity{

    @Column()
    structType: Structure;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}