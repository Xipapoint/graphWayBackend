import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSessionDataStructureRequestDTO } from '../../application/dto/request/CreateSessionDataStructureRequestDTO';
import { FindSessionDataStructuresResponseDTO } from '../../application/dto/response/FindSessionDataStructuresResponseDTO';
import { InjectionToken } from '../../application/InjectToken';
import { SessionDataStructureService } from '../../application/services/SessionDataStructureService';

@ApiTags('session-data-structures')
@Controller('session-data-structures')
export class SessionDataStructureController {
  @Inject(InjectionToken.SESSION_DATA_STRUCTURE_SERVICE)
  private readonly sessionDataStructureService: SessionDataStructureService;

  @Get('all')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Find session DataStructures' })
  @ApiResponse({
    status: 200,
    description: 'The found session DataStructures',
    type: FindSessionDataStructuresResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findSessionDataStructures(): Promise<FindSessionDataStructuresResponseDTO> {
    try {
      const sessionDataStructures =
        await this.sessionDataStructureService.findAll();
      return { sessionDataStructures };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a session DataStructure' })
  @ApiResponse({
    status: 201,
    description: 'The session DataStructure has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createSessionDataStructure(
    @Body() body: CreateSessionDataStructureRequestDTO,
  ): Promise<void> {
    try {
      return await this.sessionDataStructureService.create(body);
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
