import { SessionType } from "../entities/SessionType";

export interface SessionTypeRepository {
    save: (account: SessionType | SessionType[]) => Promise<void>
    findById: (id: string) => Promise<SessionType | null>
  }