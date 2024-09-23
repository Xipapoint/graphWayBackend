import { Edge } from "../../../../../entities/structures/EdgeWithCoords";
import { IBaseCreateOrUpdateRequestDTO } from "../../BaseCreateOrUpdateRequestDTO";

export interface IEdge<T extends Edge> extends IBaseCreateOrUpdateRequestDTO<T>{
    id: number,
    weight: number,
    top: number,
    left: number,
    angle: number,
    startVertex: number,
    endVertex: number,
    isShortest: boolean
}