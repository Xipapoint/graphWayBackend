
import { IUpdateSessionWeightedEdgeRequestDTO } from "../updateSessionData/edge/UpdateSessionWeightedEdgeRequestDTO"
import { IUpdateSessionWeightedEdgeWithCoordsRequestDTO } from "../updateSessionData/edge/UpdateSessionWeightedEdgeWithCoordsRequestDTO"
import { IUpdateOrDeleteSessionVertexPairRequestDTO } from "../updateSessionData/vertex/UpdateOrDeleteSessionVertexBaseRequestDTO"
import { IUpdateOrDeleteSessionVertexBaseRequestDTO } from "../updateSessionData/vertex/UpdateSessionVertexRequestDTO"

export interface IUpdateWeightedTreeSessionRequestDTO{
    dataType: DATATYPE
    vertices?: IUpdateOrDeleteSessionVertexBaseRequestDTO[] | IUpdateOrDeleteSessionVertexPairRequestDTO[]
    edges?: IUpdateSessionWeightedEdgeRequestDTO[] | IUpdateSessionWeightedEdgeWithCoordsRequestDTO[]
    sessionId: string
    imageBase64: string
}