import { IVertex } from './interfaces/vertex';
import { IUpdateOrDeleteSessionEdgeRequestDTO } from './updateSessionData/UpdateSessionEdgeRequestDTO';
import { IUpdateOrDeleteSessionVertexRequestDTO } from './updateSessionData/UpdateSessionVertexRequestDTO';

export interface IUpdateSessionRequestDTO{
    vertices?: IUpdateOrDeleteSessionVertexRequestDTO[]
    edges?: IUpdateOrDeleteSessionEdgeRequestDTO[]
    sessionId: string
    imageBase64: string
}