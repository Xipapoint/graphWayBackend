import { ICommand } from '@nestjs/cqrs';

export class UpdateGraphSessionStructureCommand implements ICommand {
  constructor(
    public readonly id: string,
    public verticesId: number[],
    public edgesId: number[],
  ) {}
}
