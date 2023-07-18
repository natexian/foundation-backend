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

import { ParticipantGroupService } from './participant-group.service';
import { ParticipantGroupDto } from './dto/participant-group.dto';
import { ParticipantGroup } from './entities/participant-group.entity';

@ApiTags('participant-group')
@Controller('participant-group')
export class ParticipantGroupController {
  private _logger = new Logger('ParticipantGroupController');
  constructor(private readonly participantGroupService: ParticipantGroupService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() participantGroupDto: ParticipantGroupDto
  ): Promise<ObjectId> {
    this._logger.log('create: start create');
    return await this.participantGroupService.create(participantGroupDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(): Promise<ParticipantGroup[]> {
    this._logger.log('findAll: start findAll');
    return this.participantGroupService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string) {
    this._logger.log('findOne: start findOne');
    return await this.participantGroupService.findOne(id);
  }

  @Get(':id/participants')
  @ApiResponse({
    status: 200,
    description: 'The records have been successfully retrieved.',
  })
  async findParticipants(@Param('id') id: string) {
    this._logger.log('findOne: start findParticipants');
    return await this.participantGroupService.findParticipants(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateActivityTypeDto: ParticipantGroupDto
  ) {
    this._logger.log('update: start update');
    return this.participantGroupService.update(id, updateActivityTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    this._logger.log('remove: start remove');
    return this.participantGroupService.remove(id);
  }

  @Patch(':id/anonymize')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully anonymized.',
  })
  anonymize(
    @Param('id') id: string
  ) {
    this._logger.log('anonymize: start anonymize');
    return this.participantGroupService.anonymize(id);
  }
}
