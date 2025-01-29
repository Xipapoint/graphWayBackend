import { ICommand } from '@nestjs/cqrs';

export class CreateGraphSessionCommand implements ICommand {
  constructor(
    readonly image: Buffer,
    readonly sessionAlgorithmId: string,
    readonly sessionDataStructureId: string,
    readonly sessionStructureId: string,
    readonly sessionModeId: string,
    readonly analyticsId: string,
    readonly userId: string,
  ) {}
}
