import { Session } from "./Session";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Edge {
  @PrimaryGeneratedColumn('uuid')
  edgeId: number;

  @Column({ nullable: true })
  left?: number;

  @Column({ nullable: true })
  right?: number;

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

  @Column({ default: false })
  isShortest: boolean;

  @ManyToOne(() => Session, session => session.edges)
  session: Session;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}