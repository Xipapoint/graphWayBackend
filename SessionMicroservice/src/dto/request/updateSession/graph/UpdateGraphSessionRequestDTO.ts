import { IUpdateSessionEdgeRequestDTO } from '../updateSessionData/edge/UpdateSessionEdgeRequestDTO';
import { IUpdateSessionWeightedEdgeRequestDTO } from '../updateSessionData/edge/UpdateSessionWeightedEdgeRequestDTO';
import {IUpdateSessionWeightedEdgeWithCoordsRequestDTO} from '../updateSessionData/edge/UpdateSessionWeightedEdgeWithCoordsRequestDTO'
import { IUpdateOrDeleteSessionVertexPairRequestDTO } from '../updateSessionData/vertex/UpdateOrDeleteSessionVertexBaseRequestDTO';
import { IUpdateOrDeleteSessionVertexBaseRequestDTO } from '../updateSessionData/vertex/UpdateSessionVertexRequestDTO';

export interface IUpdateGraphSessionRequestDTO{
    vertices?: IUpdateOrDeleteSessionVertexBaseRequestDTO[] | IUpdateOrDeleteSessionVertexPairRequestDTO[]
    edges?: IUpdateSessionEdgeRequestDTO[]
    sessionId: string
    imageBase64: string
    dataType: DATATYPE
}