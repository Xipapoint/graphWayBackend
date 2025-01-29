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
import { SessionAlgorithmDTO } from '../../application/dto/DTOEntities/SessionAlgorithmDTO';
import { CreateSessionAlgorithmRequestDTO } from '../../application/dto/request/CreateSessionAlgorithmRequestDTO';
import { FindSessionAlgorithmsResponseDTO } from '../../application/dto/response/FindSessionAlgorithmsDTO';
import { InjectionToken } from '../../application/InjectToken';
import { SessionAlgorithmService } from '../../application/services/SessionAlgorithmService';

@ApiTags('session-algorithms')
@Controller('session-algorithms')
export class SessionAlgorithmController {
  @Inject(InjectionToken.SESSION_ALGORITHM_SERVICE)
  private readonly sessionAlgorithmService: SessionAlgorithmService;

  @Get('all')
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Find session algorithms' })
  @ApiResponse({
    status: 200,
    description: 'The found session algorithms',
    type: FindSessionAlgorithmsResponseDTO,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findSessionAlgorithms(): Promise<FindSessionAlgorithmsResponseDTO> {
    try {
      const sessionAlgorithms = await this.sessionAlgorithmService.findAll();
      return { sessionAlgorithms };
    } catch (error) {
      throw new Error(String(error));
    }
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
    try {
      return await this.sessionAlgorithmService.create(body);
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Get('by-structure/:structureId')
  @ApiOperation({ summary: 'Find session algorithms by structure ID' })
  @ApiResponse({
    status: 200,
    description: 'The found session algorithms by structure ID',
    type: [SessionAlgorithmDTO],
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findSessionAlgorithmsByStructureId(
    @Param('structureId') structureId: string,
  ): Promise<SessionAlgorithmDTO[]> {
    try {
      const sessionAlgorithms =
        await this.sessionAlgorithmService.findSessionAlgorithmsByStructureId(
          structureId,
        );
      return sessionAlgorithms;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
