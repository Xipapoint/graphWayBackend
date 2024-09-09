import { Vertex } from "../../../../../entities/structures/Vertex"
import { IBaseCreateOrUpdateRequestDTO } from "../../BaseCreateOrUpdateRequestDTO"

export interface IVertex<T extends Vertex> extends IBaseCreateOrUpdateRequestDTO<T>{
    id: number
    xCord?: number
    yCord?: number
    pair?: number[]
    isShortest: boolean
}