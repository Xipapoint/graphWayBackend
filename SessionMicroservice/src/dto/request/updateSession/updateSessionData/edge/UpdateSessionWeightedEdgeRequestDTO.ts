import { IWeightedEdge } from "../../interfaces/structures/WeightedEdges.interface";

export interface IUpdateSessionWeightedEdgeRequestDTO {
    id: number
    updateType: UPDATETYPE
    edge?: IWeightedEdge
}