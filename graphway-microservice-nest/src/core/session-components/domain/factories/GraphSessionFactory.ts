import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { GraphSession, GraphSessionProperties, GraphSessionEssentialProperties } from "../../../sessions/domain/entities/GraphSession";


type CreateGraphSessionOptions = GraphSessionEssentialProperties;
  
  export class GraphSessionFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  
    create(options: CreateGraphSessionOptions): GraphSession {
      return this.eventPublisher.mergeObjectContext(
        new GraphSession({
          ...options,
          verticesId: [],
          edgesId: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    }
  
    reconstitute(properties: GraphSessionProperties): GraphSession {
      return this.eventPublisher.mergeObjectContext(
        new GraphSession(properties),
      );
    }
}