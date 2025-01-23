import { Column, Entity } from "typeorm";
import { BaseStructureEntity } from "../base/BaseStructureEntity";

@Entity('vertex-coords')
export class VertexCoords extends BaseStructureEntity{
    @Column()
    xCord: number;
  
    @Column()
    yCord: number;
  
    @Column({ type: 'simple-array', nullable: true })
    pair: number[];
}