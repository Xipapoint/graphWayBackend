import { Vertex } from "../../entities/structures/Vertex";
import { BaseRepository } from "../baseRepository";
import { IVertexRepositoryImpl } from "../impl/repos/vertexRepositoryImpl";

export class VertexRepository extends BaseRepository<Vertex> implements IVertexRepositoryImpl{

}