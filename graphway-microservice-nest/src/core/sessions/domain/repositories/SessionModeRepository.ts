import { SessionMode } from '../entities/SessionMode';

export interface SessionModeRepository {
  save: (account: SessionMode | SessionMode[]) => Promise<void>;
  findById: (id: string) => Promise<SessionMode | null>;
  exists: (title: string) => Promise<boolean>;
}
