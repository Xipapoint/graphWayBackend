import { FindResult } from './base/FindResult';

interface SessionStructure {
  id: string;
  title: string;
  description: string;
  image: Buffer;
}

export class FindSessionStructuresResult extends FindResult<SessionStructure> {
  constructor(readonly sessionStructures: Readonly<SessionStructure>[]) {
    super(sessionStructures);
  }
}
