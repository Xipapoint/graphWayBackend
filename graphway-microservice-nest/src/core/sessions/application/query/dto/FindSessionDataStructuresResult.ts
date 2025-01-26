import { FindResult } from './base/FindResult';

interface SessionDataStructure {
  id: string;
  title: string;
  description: string;
  image: Buffer;
}

export class FindSessionDataStructuresResult extends FindResult<SessionDataStructure> {
  constructor(
    readonly sessionDataStructures: Readonly<SessionDataStructure>[],
  ) {
    super(sessionDataStructures);
  }
}
