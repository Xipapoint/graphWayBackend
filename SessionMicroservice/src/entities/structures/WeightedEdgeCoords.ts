import { Column, Entity } from "typeorm";
import { WeightedEdge } from "./WeightedEdge";

@Entity('weighted-edge-coords')
export class WeightedEdgeCoords extends WeightedEdge{
    @Column()
    left: number;
  
    @Column()
    top: number;
  
    @Column()
    angle: number;
  
}