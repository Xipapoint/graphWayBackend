import { SessionStructure } from "../entities/SessionStructure";

export interface SessionStructureRepository {
    save: (account: SessionStructure | SessionStructure[]) => Promise<void>
    findById: (id: string) => Promise<SessionStructure | null>
  }