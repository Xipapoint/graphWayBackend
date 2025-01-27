import { FindResult } from './base/FindResult';

interface SessionAlgorithm {
  id: string;
  title: string;
  description: string;
  image: Buffer;
  sessionStructureId: number;
}

export class FindSessionAlgorithmsResult extends FindResult<SessionAlgorithm> {
  constructor(readonly sessionAlgorithms: Readonly<SessionAlgorithm>[]) {
    super(sessionAlgorithms);
  }
}
