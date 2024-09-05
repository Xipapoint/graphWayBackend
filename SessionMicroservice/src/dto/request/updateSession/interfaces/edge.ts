export interface IEdge{
    id: number,
    weight: number,
    top: number,
    left: number,
    angle: number,
    startVertex: number,
    endVertex: number,
    isShortest: boolean
}