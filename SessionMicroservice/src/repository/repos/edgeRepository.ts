import { Edge } from "../../entities/structures/Edge";
import { BaseRepository } from "../baseRepository";
import { IEdgeRepositoryImpl } from "../impl/repos/edgeRepositoryImpl";


export class EdgeRepository extends BaseRepository<Edge> implements IEdgeRepositoryImpl{

}