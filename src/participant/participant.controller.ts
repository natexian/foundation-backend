import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

import { ParticipantService } from './participant.service';
import { ParticipantDto } from './dto/participant.dto';
import { Participant } from './entities/participant.entity';
import { Activity } from '../activity/entities/activity.entity';

@ApiTags('participant')
@Controller('participant')
export class ParticipantController {
  private _logger = new Logger('ParticipantController');
  constructor(
    private readonly participantService: ParticipantService
  ) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() createActivityTypeDto: ParticipantDto
  ): Promise<ObjectId> {
    this._logger.log('create: start create');
    return await this.participantService.create(createActivityTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(): Promise<Participant[]> {
    this._logger.log('findAll: start findAll');
    return this.participantService.findAll();
  }

  @Get(':id/activities')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findActivities(
    @Param('id') id: string
  ): Promise<Activity[]> {
    this._logger.log('findActivities: start findActivities');
    return this.participantService.findActivities(id);
  }


  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<Participant> {
    this._logger.log('findOne: start findOne');
    return await this.participantService.findOne(id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    this._logger.log('remove: start remove');
    return this.participantService.remove(id);
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
    return this.participantService.anonymize(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: ParticipantDto
  ) {
    this._logger.log('update: start update');
    return this.participantService.update(id, updateParticipantDto);
  }

}
