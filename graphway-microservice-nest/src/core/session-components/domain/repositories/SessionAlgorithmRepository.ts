import { SessionAlgorithm } from '../entities/SessionAlgorithm';
import { BaseSessionComponentRepository } from './base/BaseSessionComponentRepository';

export interface SessionAlgorithmRepository
  extends BaseSessionComponentRepository<SessionAlgorithm> {
  findAlgorithmsByStructureId: (
    structureId: string,
  ) => Promise<SessionAlgorithm[]>;
}
