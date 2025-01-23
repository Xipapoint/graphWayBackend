import { IVertexPair } from "../../interfaces/structures/VertexPair.interface"

export interface IUpdateOrDeleteSessionVertexPairRequestDTO {
    id: number
    updateType: UPDATETYPE
    vertex?: IVertexPair
}