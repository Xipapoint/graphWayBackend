import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  GraphSessionEssentialProperties,
  GraphSession,
  GraphSessionProperties,
} from '../entities/GraphSession';

export class GraphSessionFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: GraphSessionEssentialProperties): GraphSession {
    return this.eventPublisher.mergeObjectContext(
      new GraphSession({
        ...options,
        vertexIds: [],
        edgeIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }

  reconstitute(properties: GraphSessionProperties): GraphSession {
    return this.eventPublisher.mergeObjectContext(new GraphSession(properties));
  }
}
