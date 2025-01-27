export interface BaseSessionComponentRepository<T> {
  save: (account: T | T[]) => Promise<void>;
  findById: (id: string) => Promise<T | null>;
  exists: (title: string) => Promise<boolean>;
}
