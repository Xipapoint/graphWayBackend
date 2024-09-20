import { Column, Entity, OneToMany } from "typeorm";
import { BaseSessionEntity } from "../base/BaseSessionEntity";
import { Edge } from "../structures/Edge";
import { Vertex } from "../structures/Vertex";
import { Alghorithm } from "../types/Alghorithm";
import { WeightedEdge } from "../structures/WeightedEdge";

@Entity('graph-sessions')
export class GraphSessions extends BaseSessionEntity{
    @OneToMany( () => Vertex, vertex => vertex.id, {nullable: true})
    vertices?: Vertex[];

    @Column({nullable: true})
    alghorithm?: Alghorithm

    @Column({ nullable: true, type: 'simple-array' })
    shortestVertices?: number[];

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}