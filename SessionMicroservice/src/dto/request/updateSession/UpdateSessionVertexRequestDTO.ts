import { IVertex } from "./interfaces/vertex";

export interface IUpdateOrDeleteSessionVertexRequestDTO {
    id: number
    updateType: 'delete' | 'update' | 'create'
    vertex?: IVertex
}
