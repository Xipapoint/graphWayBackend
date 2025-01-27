import { FindResult } from './base/FindResult';

interface SessionMode {
  id: string;
  title: string;
  description: string;
  image: Buffer;
}

export class FindSessionModesResult extends FindResult<SessionMode> {
  constructor(readonly sessionModes: Readonly<SessionMode>[]) {
    super(sessionModes);
  }
}
