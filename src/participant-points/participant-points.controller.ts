import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

import { ParticipantPointsService } from './participant-points.service';
import { ParticipantPointDto } from './dto/participant-point.dto';

@ApiTags('participant-points')
@Controller('participant-points')
export class ParticipantPointsController {
  private _logger = new Logger('ParticipantPointsController');
  constructor(
    private readonly participantPointsService: ParticipantPointsService
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createParticipantPointDto: ParticipantPointDto) {
    this._logger.log('create: start create');
    return this.participantPointsService.create(createParticipantPointDto);
  }

  @Get('session/:sessionId/participant/:participantId/')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAllPointsForParticipant(
    @Param('participantId') participantId: string,
    @Param('sessionId') sessionId: string
  ) {
    this._logger.log('findAll: start findAll');
    return this.participantPointsService.findAll(participantId, sessionId);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(@Body() updateParticipantPointDto: ParticipantPointDto) {
    this._logger.log('update: start update');
    return this.participantPointsService.update(updateParticipantPointDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') participantPointsId: ObjectId) {
    this._logger.log('remove: start remove');
    return this.participantPointsService.remove(participantPointsId);
  }
}
