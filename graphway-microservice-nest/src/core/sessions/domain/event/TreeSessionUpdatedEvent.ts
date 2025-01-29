import { IEvent } from '@nestjs/cqrs';

export class TreeSessionUpdatedEvent implements IEvent {
  constructor(
    readonly verticesId: number[],
    readonly edgesId: number[],
  ) {}
}
