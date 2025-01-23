import { IEdgeBase } from "../../interfaces/structures/base/EdgeBase.interface"

export interface IUpdateSessionEdgeRequestDTO {
    id: number
    updateType: UPDATETYPE
    edge?: IEdgeBase
}