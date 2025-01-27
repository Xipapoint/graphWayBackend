import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSessionStructureCommand } from '../../application/command/CreateSessionStructureCommand';
import { FindSessionStructuresQuery } from '../../application/query/queries/FindSessionStructuresQuery';
import { CreateSessionStructureRequestDTO } from '../dto/request/CreateSessionStructureRequestDTO';
import { FindSessionStructuresResponseDTO } from '../dto/response/FindSessionStructuresDTO';

@ApiTags('session-data-structures')
@Controller('session-data-structures')
export class SessionStructureController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('all')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Find session structures' })
  @ApiResponse({
    status: 200,
    description: 'The found session structures',
    type: FindSessionStructuresResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findSessionStructures(): Promise<FindSessionStructuresResponseDTO> {
    const query = new FindSessionStructuresQuery();
    return this.queryBus.execute(query);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a session data structure' })
  @ApiResponse({
    status: 201,
    description: 'The session data structure has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createSessionStructure(
    @Body() body: CreateSessionStructureRequestDTO,
  ): Promise<void> {
    const command = new CreateSessionStructureCommand(
      body.title,
      body.description,
      body.image,
    );
    await this.commandBus.execute(command);
  }
}
