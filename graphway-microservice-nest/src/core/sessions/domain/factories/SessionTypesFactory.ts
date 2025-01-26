import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { SessionType, SessionTypeEssentialProperties, SessionTypeProperties } from "../entities/SessionDataStructure";

  export class SessionTypeFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;
  
    create(options: SessionTypeEssentialProperties): SessionType {
      return this.eventPublisher.mergeObjectContext(
        new SessionType({
          ...options,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      );
    }
  
    reconstitute(properties: SessionTypeProperties): SessionType {
      return this.eventPublisher.mergeObjectContext(
        new SessionType(properties),
      );
    }
}