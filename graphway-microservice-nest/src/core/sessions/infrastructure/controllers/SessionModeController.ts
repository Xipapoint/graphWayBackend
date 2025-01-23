import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindSessionModesQuery } from '../../application/query/queries/FindSessionModesQuery';
import { FindSessionModesResponseDTO } from '../dto/FindSessionModesResponseDTO';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Get, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('session-modes')
@Controller()
export class SessionModeController {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Find session modes' })
  @ApiResponse({
    status: 200,
    description: 'The found session modes',
    type: FindSessionModesResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findSessionModes(): Promise<FindSessionModesResponseDTO> {
    const query = new FindSessionModesQuery();
    return this.queryBus.execute(query);
  }
}
