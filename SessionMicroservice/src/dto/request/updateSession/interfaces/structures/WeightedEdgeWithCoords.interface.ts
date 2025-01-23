import { WeightedEdge } from "../../../../../entities/structures/WeightedEdge";

export interface IWeightedEdgeWithCords extends WeightedEdge{
    top: number,
    left: number,
    angle: number,
}