import { SessionType } from "../entities/SessionDataStructure";

export interface SessionTypeRepository {
    save: (account: SessionType | SessionType[]) => Promise<void>
    findById: (id: string) => Promise<SessionType | null>
  }