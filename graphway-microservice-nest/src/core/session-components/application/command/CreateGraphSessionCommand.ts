import { ICommand } from '@nestjs/cqrs';

export class CreateGraphSessionCommand implements ICommand {
  constructor(
    readonly title: string,
    readonly image: Buffer,
    readonly sessionAlgorithmId: number,
    readonly sessionStructureId: number,
    readonly sessionTypeId: number,
    readonly sessionModeId: number,
    readonly userId: string,
  ) {}
}
