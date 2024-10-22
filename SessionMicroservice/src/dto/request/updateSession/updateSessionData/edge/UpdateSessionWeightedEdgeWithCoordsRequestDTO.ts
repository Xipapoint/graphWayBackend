import { IWeightedEdgeWithCords } from '../../interfaces/structures/WeightedEdgeWithCoords.interface';
export interface IUpdateSessionWeightedEdgeWithCoordsRequestDTO {
    id: number
    updateType: UPDATETYPE
    edge?: IWeightedEdgeWithCords
}