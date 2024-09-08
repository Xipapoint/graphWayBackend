import { Repository } from "typeorm";
import { Vertex } from "../../entities/structures/Vertex";
import { BaseRepository } from "../baseRepository";
import { IVertexRepositoryImpl } from "../impl/repos/vertexRepositoryImpl";
import { AppDataSource } from "../../dataSource";

class VertexRepository extends BaseRepository<Vertex> implements IVertexRepositoryImpl{
    vertexRepository: Repository<Vertex>
    constructor(vertexRepository: Repository<Vertex>){
        super(Vertex)
        this.vertexRepository = vertexRepository
    }
}
export default new VertexRepository(AppDataSource.getRepository(Vertex))