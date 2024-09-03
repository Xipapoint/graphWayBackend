
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Session } from "./Session";

@Entity()
export class Vertex {
  @PrimaryGeneratedColumn()
  vertexId: number;

  @Column({nullable: true})
  xCord?: number;

  @Column({nullable: true})
  yCord?: number;

  @Column({ type: 'simple-array', nullable: true })
  pair?: number[];

  @Column({ default: false })
  isShortest: boolean;

  @ManyToOne(() => Session, session => session, {nullable: true})
  session?: Session;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}