import { Inject, Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { SessionAlgorithm, SessionAlgorithmEssentialProperties, SessionAlgorithmProperties } from "../entities/SessionAlgorithm";

@Injectable()
export class SessionAlgorithmFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: SessionAlgorithmEssentialProperties): SessionAlgorithm {
    return this.eventPublisher.mergeObjectContext(
      new SessionAlgorithm({
        ...options,
        createdAt: new Date(),
        updatedAt:new Date(),
      }),
    );
  }

  reconstitute(properties: SessionAlgorithmProperties): SessionAlgorithm {
    return this.eventPublisher.mergeObjectContext(
      new SessionAlgorithm(properties),
    );
  }
}