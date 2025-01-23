import { IEventHandler } from '@nestjs/cqrs';
import { UpdatedGraphSessionStructureEvent } from '../../domain/event/UpdatedGraphSessionStructureEvent';

export class UpdateGraphSessionStructureEventHandler
  implements IEventHandler<UpdatedGraphSessionStructureEvent>
{
  handle(event: UpdatedGraphSessionStructureEvent) {
    throw new Error('Method not implemented.');
  }
}
