import { Vertex } from "../../../../entities/structures/Vertex";
import { IVertex } from "../interfaces/structures/vertex";

export interface IUpdateOrDeleteSessionVertexRequestDTO {
    id: number
    updateType: 'delete' | 'update' | 'create'
    vertex?: IVertex<Vertex>
}
