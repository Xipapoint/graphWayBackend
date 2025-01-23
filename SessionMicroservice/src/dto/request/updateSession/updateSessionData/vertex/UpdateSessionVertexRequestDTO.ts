import { Vertex } from "../../../../../entities/structures/base/Vertex";
import { IVertexBase } from "../../interfaces/structures/base/VertexBase.interface";


export interface IUpdateOrDeleteSessionVertexBaseRequestDTO {
    id: number
    updateType: UPDATETYPE
    vertex?: IVertexBase
}
