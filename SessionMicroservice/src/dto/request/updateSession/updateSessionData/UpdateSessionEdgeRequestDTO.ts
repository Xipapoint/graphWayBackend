import { IEdge } from "../interfaces/edge";

export interface IUpdateOrDeleteSessionEdgeRequestDTO {
    id: number
    updateType: 'delete' | 'update' | 'create'
    edge?: IEdge
}