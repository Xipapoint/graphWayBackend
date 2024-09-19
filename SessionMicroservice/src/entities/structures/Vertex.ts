
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Session } from "../Session";
import { BaseEntity } from "../BaseEntity";
import { BaseStructureEntity } from "../base/BaseStructureEntity";

@Entity('vertices')
export class Vertex extends BaseStructureEntity {

  @Column({nullable: true})
  xCord?: number;

  @Column({nullable: true})
  yCord?: number;

  @Column({ type: 'simple-array', nullable: true })
  pair?: number[];

  @ManyToOne(() => Session, session => session, {nullable: true})
  session?: Session;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}