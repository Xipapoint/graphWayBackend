import { BaseStructureEntity } from "../base/BaseStructureEntity";
import { BaseEntity } from "../BaseEntity";
import { Session } from "../Session";
import { Entity, Column } from "typeorm";
import { Edge } from "./base/Edge";

@Entity('edge-coords')
export class EdgeWithCoords extends Edge {

  @Column()
  left?: number;

  @Column()
  top?: number;

  @Column()
  angle: number;

}