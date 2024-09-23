import { Column, Entity, OneToMany } from "typeorm";
import { BaseSessionEntity } from "../base/BaseSessionEntity";
import { Vertex } from "../structures/base/Vertex";
import { Alghorithm } from "../types/Alghorithm";

@Entity('graph-sessions')
export class GraphSessions extends BaseSessionEntity{

    @Column({nullable: true})
    alghorithm?: Alghorithm

    @Column({ nullable: true, type: 'simple-array' })
    shortestVertices?: number[];

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}