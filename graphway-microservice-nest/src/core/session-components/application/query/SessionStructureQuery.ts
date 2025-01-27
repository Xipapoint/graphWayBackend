import { FindSessionStructureByIdResult } from './dto/FindSessionStructuresByIdResult';
import { FindSessionStructuresResult } from './dto/FindsSessionStructuresResult';

export interface SessionStructureQuery {
  findById: (id: string) => Promise<FindSessionStructureByIdResult | null>;
  find: () => Promise<FindSessionStructuresResult>;
}
