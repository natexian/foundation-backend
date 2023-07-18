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

import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@ApiTags('notification')
@Controller('notifications')
export class NotificationsController {
  private _logger = new Logger('NotificationsController');
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    this._logger.log('create: start create');
    return this.notificationsService.create(createNotificationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findOne(@Param('id') id: ObjectId) {
    this._logger.log('findOne: start findOne');
    return this.notificationsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: ObjectId,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    this._logger.log('update: start update');
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: ObjectId) {
    this._logger.log('remove: start remove');
    return this.notificationsService.remove(id);
  }
}
