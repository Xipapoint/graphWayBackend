import { Edge } from "../../../../entities/structures/EdgeWithCoords";
import { IEdge } from "../interfaces/structures/edge";

export interface IUpdateOrDeleteSessionEdgeRequestDTO {
    id: number
    updateType: 'delete' | 'update' | 'create'
    edge?: IEdge<Edge>
}