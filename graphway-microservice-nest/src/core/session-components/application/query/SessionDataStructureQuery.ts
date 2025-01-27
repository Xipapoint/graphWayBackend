import { FindSessionDataStructureByIdResult } from './dto/FindSessionDataStructuresByIdResult';
import { FindSessionDataStructuresResult } from './dto/FindSessionDataStructuresResult';

export interface SessionDataStructuresQuery {
  findById: (id: string) => Promise<FindSessionDataStructureByIdResult | null>;
  find: () => Promise<FindSessionDataStructuresResult>;
}
