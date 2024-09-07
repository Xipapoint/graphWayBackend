import { BaseStructureEntity } from "../base/BaseStructureEntity";
import { BaseEntity } from "../BaseEntity";
import { Session } from "../Session";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

@Entity('edges')
export class Edge extends BaseStructureEntity {

  @Column({ nullable: true })
  left?: number;

  @Column({ nullable: true })
  top?: number;

  @Column({ nullable: true })
  weight?: number;

  @Column({ nullable: true })
  angle?: number;

  @Column()
  startVertex: number;

  @Column()
  endVertex: number;

  @ManyToOne(() => Session, session => session.edges, {nullable: true})
  session?: Session;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}