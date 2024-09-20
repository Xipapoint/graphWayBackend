import { BaseStructureEntity } from "../base/BaseStructureEntity";
import { BaseEntity } from "../BaseEntity";
import { Session } from "../Session";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

@Entity('edges')
export class Edge extends BaseStructureEntity {

  @Column()
  left: number;

  @Column()
  top: number;

  @Column()
  angle: number;

  @Column()
  startVertex: number;

  @Column()
  endVertex: number;

  sessionId: string

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}