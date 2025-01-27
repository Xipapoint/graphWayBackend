import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  SessionDataStructure,
  SessionDataStructureEssentialProperties,
  SessionDataStructureProperties,
} from '../entities/SessionDataStructure';

export class SessionDataStructureFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(
    options: SessionDataStructureEssentialProperties,
  ): SessionDataStructure {
    return this.eventPublisher.mergeObjectContext(
      new SessionDataStructure({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }

  reconstitute(
    properties: SessionDataStructureProperties,
  ): SessionDataStructure {
    return this.eventPublisher.mergeObjectContext(
      new SessionDataStructure(properties),
    );
  }
}
