import { IEvent } from '@nestjs/cqrs';

export class UpdatedGraphSessionStructureEvent implements IEvent {
  constructor(
    public readonly id: string,
    public verticesId: number[],
    public edgesId: number[],
  ) {}
}
