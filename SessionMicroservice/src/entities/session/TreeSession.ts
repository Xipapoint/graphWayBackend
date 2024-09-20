import { Column, Entity, OneToMany } from "typeorm";
import { BaseSessionEntity } from "../base/BaseSessionEntity";
import { Vertex } from "../structures/Vertex";
import { SessionStructures } from "../types/SessionStructures";

@Entity('tree-sessions')
export class GraphSessions extends BaseSessionEntity{

    @OneToMany( () => Vertex, vertex => vertex.id, {nullable: true})
    vertices?: Vertex[];

    @Column({ nullable: true, type: 'simple-array' })
    shortestVertices?: number[];

    @Column()
    structType: SessionStructures;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}