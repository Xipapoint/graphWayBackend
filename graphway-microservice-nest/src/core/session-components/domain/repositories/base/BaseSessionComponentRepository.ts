export interface BaseSessionComponentRepository<T> {
  save: (account: T | T[]) => Promise<void>;
  findById: (id: string) => Promise<T | null>;
  findAll(): Promise<T[]>;
  exists: (title: string) => Promise<boolean>;
}
