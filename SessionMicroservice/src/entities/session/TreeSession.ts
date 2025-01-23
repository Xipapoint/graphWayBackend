import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseSessionEntity } from "../base/BaseSessionEntity";
import { Vertex } from "../structures/base/Vertex";
import { Structure } from "../types/Structures";

@Entity('tree-sessions')
export class TreeSessions extends BaseSessionEntity{

    @ManyToOne(() => Structure)
    structType: Structure;
}