import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CreateGraphSessionCommand } from '../../application/command/CreateSessionCommand';
import { CreateGraphSessionRequestDTO } from '../../application/dto/request/CreateGraphSessionRequestDTO';

@ApiTags('graph-sessions')
@Controller('graph-sessions')
export class GraphSessionController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a graph session' })
  @ApiResponse({
    status: 201,
    description: 'The session has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createGraphSession(
    @Body() body: CreateGraphSessionRequestDTO,
  ): Promise<void> {
    const command = new CreateGraphSessionCommand(
      body.image,
      body.sessionModeId,
      body.sessionDataStructureId,
      body.sessionStructureId,
      body.sessionAlgorithmId,
      body.analyticsId,
      body.userId,
    );
    await this.commandBus.execute(command);
  }
}
