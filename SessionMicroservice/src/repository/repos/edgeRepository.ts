import { Repository } from "typeorm";
import { Edge } from "../../entities/structures/Edge";
import { BaseRepository } from "../baseRepository";
import { IEdgeRepositoryImpl } from "../impl/repos/edgeRepositoryImpl";
import { AppDataSource } from "../../dataSource";


class EdgeRepository extends BaseRepository<Edge> implements IEdgeRepositoryImpl{
    private edgeRepository: Repository<Edge>
    constructor(edgeRepository: Repository<Edge>){
        super(Edge)
        this.edgeRepository = edgeRepository
    }
}

export default new EdgeRepository(AppDataSource.getRepository(Edge))