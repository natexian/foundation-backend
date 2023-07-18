import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, NotFoundException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

import { SessionService } from './session.service';
import { SessionDto } from './dto/session.dto';
import { Session } from './entities/session.entity';

@ApiTags('session')
@Controller('session')
export class SessionController {
  private _logger = new Logger('SessionController');
  constructor(private readonly sessionService: SessionService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() createActivityTypeDto: SessionDto
  ): Promise<ObjectId> {
    this._logger.log('create: start create');
    return await this.sessionService.create(createActivityTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(): Promise<Session[]> {
    this._logger.log('findAll: start findAll');
    return this.sessionService.findAll();
  }

  @Get('current')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findCurrent(): Promise<Session> {
    this._logger.log('findCurrent: start findCurrent');
    const existingRecord = await this.sessionService.findCurrent();
    if (!existingRecord) {
      throw new NotFoundException(
        `Active Session does not exist.`
      );
    }
    return existingRecord;
  }

  @Post(':id/timer/toggle')
  @ApiResponse({
    status: 201,
    description: 'The session timer has been toggled',
  })
  async toggleTimer(@Param('id') id: string) {
    this._logger.log('toggleTimer: start toggleTimer');
    return await this.sessionService.togglePause(id);
  }

  @Post(':id/timer/start')
  @ApiResponse({
    status: 201,
    description: 'The session timer has been toggled',
  })
  async startSessionTimer(@Param('id') id: string) {
    this._logger.log('startSessionTimer: start startSessionTimer');
    return await this.sessionService.startSessionTimer(id);
  }

  @Post(':id/timer/stop')
  @ApiResponse({
    status: 201,
    description: 'The session timer has been toggled',
  })
  async stopSessionTimer(@Param('id') id: string) {
    this._logger.log('stopSessionTimer: start stopSessionTimer');
    return await this.sessionService.stopSessionTimer(id);
  }
  
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<Session> {
    this._logger.log('findOne: start findOne');
    return await this.sessionService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateSessionDto: SessionDto
  ) {
    this._logger.log('update: start update');
    return this.sessionService.update(id, updateSessionDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    this._logger.log('remove: start remove');
    return this.sessionService.remove(id);
  }
}
