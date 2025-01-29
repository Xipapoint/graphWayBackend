import { IEvent } from '@nestjs/cqrs';

export class GraphSessionUpdatedEvent implements IEvent {
  constructor(
    readonly verticesId: number[],
    readonly edgesId: number[],
  ) {}
}
