import { IEvent } from '@nestjs/cqrs';

export class GraphSessionCreatedEvent implements IEvent {
  constructor(readonly sessionId: string) {}
}
