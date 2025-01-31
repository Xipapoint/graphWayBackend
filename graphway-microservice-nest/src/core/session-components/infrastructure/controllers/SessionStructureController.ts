import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
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
import { CreateSessionStructureRequestDTO } from '../../application/dto/request/CreateSessionStructureRequestDTO';
import { FindSessionStructuresResponseDTO } from '../../application/dto/response/FindSessionStructuresDTO';
import { InjectionToken } from '../../application/InjectToken';
import { SessionStructureService } from '../../application/services/SessionStructureService';
import { SessionStructureDTO } from '../../application/dto/DTOEntities/SessionStructureDTO';

@ApiTags('session-structures')
@Controller('session-structures')
export class SessionStructureController {
  @Inject(InjectionToken.SESSION_STRUCTURE_SERVICE)
  private readonly sessionStructureService: SessionStructureService;

  @Get('all')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Find session Structures' })
  @ApiResponse({
    status: 200,
    description: 'The found session Structures',
    type: FindSessionStructuresResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findSessionStructures(): Promise<FindSessionStructuresResponseDTO> {
    try {
      const sessionStructures = await this.sessionStructureService.findAll();
      return { sessionStructures };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a session Structure' })
  @ApiResponse({
    status: 201,
    description: 'The session Structure has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createSessionStructure(
    @Body() body: CreateSessionStructureRequestDTO,
  ): Promise<void> {
    try {
      return await this.sessionStructureService.create(body);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Get('by-data-structure/:dataStructureId')
  @ApiOperation({ summary: 'Find session structures by data structure ID' })
  @ApiResponse({
    status: 200,
    description: 'The found session structures by data structure ID',
    type: [SessionStructureDTO],
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findSessionAlgorithmsByStructureId(
    @Param('dataStructureId') dataStructureId: string,
  ): Promise<SessionStructureDTO[]> {
    try {
      const sessionStructures =
        await this.sessionStructureService.findSessionStructuresByDataStructureId(
          dataStructureId,
        );
      return sessionStructures;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
