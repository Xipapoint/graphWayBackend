import { Body, Controller, Inject, Post } from '@nestjs/common';

import { CacheInterceptor } from '@nestjs/cache-manager';
import { Get, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectionToken } from '../../application/InjectToken';
import { CreateSessionModeRequestDTO } from '../../application/dto/request/CreateSessionModeRequestDTO';
import { FindSessionModesResponseDTO } from '../../application/dto/response/FindSessionModesResponseDTO';
import { SessionModeService } from '../../application/services/SessionModeService';

@ApiTags('session-modes')
@Controller('session-modes')
export class SessionModeController {
  @Inject(InjectionToken.SESSION_MODE_SERVICE)
  private readonly sessionModeService: SessionModeService;

  @Get('all')
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
    try {
      const sessionModes = await this.sessionModeService.findAll();
      return { sessionModes };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a session mode' })
  @ApiResponse({
    status: 201,
    description: 'The session mode has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createSessionMode(
    @Body() body: CreateSessionModeRequestDTO,
  ): Promise<void> {
    try {
      return await this.sessionModeService.create(body);
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
