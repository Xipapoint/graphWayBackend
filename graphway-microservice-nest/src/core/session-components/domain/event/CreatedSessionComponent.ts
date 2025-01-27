import { IEvent } from '@nestjs/cqrs';

export class CreatedSessionComponent implements IEvent {
  constructor(readonly id: number, readonly title: string) {}
}