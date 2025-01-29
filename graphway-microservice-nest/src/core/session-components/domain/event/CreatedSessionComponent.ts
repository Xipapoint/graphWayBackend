import { IEvent } from '@nestjs/cqrs';

export class CreatedSessionComponent implements IEvent {
  constructor(
    readonly id: string,
    readonly title: string,
  ) {}
}
