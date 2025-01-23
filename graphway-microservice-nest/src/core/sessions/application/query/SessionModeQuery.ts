import { FindSessionModeByIdResult } from './dto/FindSessionModeByIdResult';
import { FindSessionModesResult } from './dto/FindSessionModesResult';

export interface SessionModeQuery {
  findById: (id: string) => Promise<FindSessionModeByIdResult | null>;
  find: () => Promise<FindSessionModesResult>;
}
