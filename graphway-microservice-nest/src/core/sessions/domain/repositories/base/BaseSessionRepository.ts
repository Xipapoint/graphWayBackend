export interface BaseSessionRepository<T> {
  save: (account: T | T[]) => Promise<void>;
  findById: (id: string) => Promise<T | null>;
  exists: (id: string) => Promise<boolean>;
}
