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

import { ActivityTypeService } from './activity-type.service';
import { ActivityTypeDto } from './dto/activity-type.dto';
import { ActivityType } from './entities/activity-type.entity';

@ApiTags('activity-type')
@Controller('activity-type')
export class ActivityTypeController {
  private _logger = new Logger('ActivityTypeController');
  constructor(private readonly activityTypeService: ActivityTypeService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() createActivityTypeDto: ActivityTypeDto
  ): Promise<ObjectId> {
    this._logger.log('create: start create');
    return await this.activityTypeService.create(createActivityTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(): Promise<ActivityType[]> {
    this._logger.log('findAll: start findAll');
    return this.activityTypeService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: ObjectId) {
    this._logger.log('findOne: start findOne');
    return await this.activityTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: ObjectId,
    @Body() updateActivityTypeDto: ActivityTypeDto
  ) {
    this._logger.log('update: start update');
    return this.activityTypeService.update(id, updateActivityTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: ObjectId) {
    this._logger.log('remove: start remove');
    return this.activityTypeService.remove(id);
  }
}
