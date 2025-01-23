import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseSessionEntity } from "../base/BaseSessionEntity";
import { Vertex } from "../structures/base/Vertex";
import { Alghorithm } from "../types/Alghorithm";

@Entity('graph-sessions')
export class GraphSessions extends BaseSessionEntity{

    @ManyToOne(() => Alghorithm)
    alghorithm: Alghorithm

    @Column({ nullable: true, type: 'simple-array' })
    shortestVertices?: number[];

}