import { Entity, Column, ManyToOne } from "typeorm";
import { BaseStructureEntity } from "../base/BaseStructureEntity";
import { GraphSessions } from "../session/GraphSession";

@Entity('weighted-edges')
export class WeightedEdge extends BaseStructureEntity{

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

    @Column()
    weight: number;
    
    @Column({})
    sessionId: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}