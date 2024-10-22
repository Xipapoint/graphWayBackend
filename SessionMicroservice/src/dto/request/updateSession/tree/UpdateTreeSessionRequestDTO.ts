
import { IUpdateSessionEdgeRequestDTO } from "../updateSessionData/edge/UpdateSessionEdgeRequestDTO"
import { IUpdateOrDeleteSessionVertexPairRequestDTO } from "../updateSessionData/vertex/UpdateOrDeleteSessionVertexBaseRequestDTO"
import { IUpdateOrDeleteSessionVertexBaseRequestDTO } from "../updateSessionData/vertex/UpdateSessionVertexRequestDTO"

export interface IUpdateTreeSessionRequestDTO{
    dataType: DATATYPE
    vertices?: IUpdateOrDeleteSessionVertexBaseRequestDTO[] | IUpdateOrDeleteSessionVertexPairRequestDTO
    edges?: IUpdateSessionEdgeRequestDTO[]
    sessionId: string
    imageBase64: string
}