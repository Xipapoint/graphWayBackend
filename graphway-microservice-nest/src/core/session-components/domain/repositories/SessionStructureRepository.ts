import { SessionStructure } from '../entities/SessionStructure';
import { BaseSessionComponentRepository } from './base/BaseSessionComponentRepository';

export interface SessionStructureRepository
  extends BaseSessionComponentRepository<SessionStructure> {
  findStructuresByDataStructureId: (
    structureId: string,
  ) => Promise<SessionStructure[]>;
}
