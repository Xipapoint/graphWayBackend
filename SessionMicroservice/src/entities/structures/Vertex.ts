
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Session } from "../Session";
import { BaseEntity } from "../BaseEntity";
import { BaseStructureEntity } from "../base/BaseStructureEntity";

@Entity('vertices')
export class Vertex extends BaseStructureEntity {

  @Column()
  xCord: number;

  @Column()
  yCord: number;

  @Column({ type: 'simple-array', nullable: true })
  pair?: number[];

  sessionId: string

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}