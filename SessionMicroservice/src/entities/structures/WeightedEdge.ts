import { Entity, Column, ManyToOne } from "typeorm";
import { Edge } from "./base/Edge";

@Entity('weighted-edges')
export class WeightedEdge extends Edge{

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

}