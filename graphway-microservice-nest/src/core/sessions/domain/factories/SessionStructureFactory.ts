import { Injectable, Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { SessionStructure, SessionStructureEssentialProperties, SessionStructureProperties } from "../entities/SessionStructure";

@Injectable()
export class SessionStructureFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: SessionStructureEssentialProperties): SessionStructure {
    return this.eventPublisher.mergeObjectContext(
      new SessionStructure({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }

  reconstitute(properties: SessionStructureProperties): SessionStructure {
    return this.eventPublisher.mergeObjectContext(
      new SessionStructure(properties),
    );
  }
}