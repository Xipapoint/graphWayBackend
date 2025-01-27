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
import { CreateSessionDataStructureCommand } from '../../application/command/CreateSessionDataStructureCommand';
import { FindSessionDataStructuresQuery } from '../../application/query/queries/FindSessionDataStructuresQuery';
import { CreateSessionDataStructureRequestDTO } from '../dto/request/CreateSessionDataStructureRequestDTO';
import { FindSessionDataStructuresResponseDTO } from '../dto/response/FindSessionDataStructuresResponseDTO';

@ApiTags('session-data-structures')
@Controller('session-data-structures')
export class SessionDataStructureController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get('all')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Find session data structures' })
  @ApiResponse({
    status: 200,
    description: 'The found session data structures',
    type: FindSessionDataStructuresResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findSessionDataStructures(): Promise<FindSessionDataStructuresResponseDTO> {
    const query = new FindSessionDataStructuresQuery();
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
  async createSessionDataStructure(
    @Body() body: CreateSessionDataStructureRequestDTO,
  ): Promise<void> {
    const command = new CreateSessionDataStructureCommand(
      body.title,
      body.description,
      body.image,
    );
    await this.commandBus.execute(command);
  }
}
