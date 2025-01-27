import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CreateSessionAlgorithmCommand } from '../../application/command/CreateSessionAlgorithmCommand';
import { FindSessionModesQuery } from '../../application/query/queries/FindSessionModesQuery';
import { CreateSessionAlgorithmRequestDTO } from '../dto/request/CreateSessionAlgorithmRequestDTO';
import { FindSessionAlgorithmsResponseDTO } from '../dto/response/FindSessionAlgorithmsDTO';
import { FindSessionModesResponseDTO } from '../dto/response/FindSessionModesResponseDTO';

@ApiTags('session-algorithms')
@Controller('session-algorithms')
export class SessionModeController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('all')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Find session algorithms' })
  @ApiResponse({
    status: 200,
    description: 'The found session algorithms',
    type: FindSessionModesResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findSessionAlgorithms(): Promise<FindSessionAlgorithmsResponseDTO> {
    const query = new FindSessionModesQuery();
    return this.queryBus.execute(query);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a session algorithms' })
  @ApiResponse({
    status: 201,
    description: 'The session mode has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createSessionAlgorithm(
    @Body() body: CreateSessionAlgorithmRequestDTO,
  ): Promise<void> {
    const command = new CreateSessionAlgorithmCommand(
      body.title,
      body.description,
      body.image,
      body.sessionStructureId,
    );
    await this.commandBus.execute(command);
  }
}
