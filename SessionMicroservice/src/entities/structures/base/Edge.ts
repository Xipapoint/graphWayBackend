import { Column, Entity } from "typeorm";
import { BaseStructureEntity } from "../../base/BaseStructureEntity";

@Entity('edges')
export class Edge extends BaseStructureEntity{
    @Column()
    startVertex: number;
  
    @Column()
    endVertex: number;
  
    @Column()
    sessionId: string;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}