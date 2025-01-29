import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  SessionMode,
  SessionModeEssentialProperties,
  SessionModeProperties,
} from '../entities/SessionMode';

@Injectable()
export class SessionModeFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: SessionModeEssentialProperties): SessionMode {
    return this.eventPublisher.mergeObjectContext(
      new SessionMode({
        ...options,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }

  reconstitute(properties: SessionModeProperties): SessionMode {
    return this.eventPublisher.mergeObjectContext(new SessionMode(properties));
  }
}
