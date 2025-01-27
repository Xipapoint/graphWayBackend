import { FindSessionAlgorithmByIdResult } from './dto/FindSessionAlgorithmByIdResult';
import { FindSessionAlgorithmsResult } from './dto/FindSessionAlgorithmsResult';

export interface SessionAlgorithmQuery {
  findById: (id: string) => Promise<FindSessionAlgorithmByIdResult | null>;
  find: () => Promise<FindSessionAlgorithmsResult>;
}
