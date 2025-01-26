import { SessionAlgorithm } from '../entities/SessionAlgorithm';

export interface SessionAlgorithmRepository {
  save: (account: SessionAlgorithm | SessionAlgorithm[]) => Promise<void>;
  findById: (id: string) => Promise<SessionAlgorithm | null>;
}
