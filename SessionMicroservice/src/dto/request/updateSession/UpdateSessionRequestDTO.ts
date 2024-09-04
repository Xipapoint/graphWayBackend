import { IVertex } from './interfaces/vertex';
import { IUpdateOrDeleteSessionEdgeRequestDTO } from './UpdateSessionEdgeRequestDTO';
import { IUpdateOrDeleteSessionVertexRequestDTO } from './UpdateSessionVertexRequestDTO';

export interface IUpdateSessionRequestDTO{
    vertices?: IUpdateOrDeleteSessionVertexRequestDTO[]
    edges?: IUpdateOrDeleteSessionEdgeRequestDTO[]
    sessionId: string
}