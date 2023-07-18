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

import { SessionDevicesService } from './session-devices.service';
import { SessionDeviceDto } from './dto/session-device.dto';
import { Device } from '../device/entities/device.entity';

@ApiTags('session-devices')
@Controller('session-devices')
export class SessionDevicesController {
  private _logger = new Logger('SessionDevicesController');
  constructor(private readonly sessionDevicesService: SessionDevicesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(@Body() createSessionDeviceDto: SessionDeviceDto) {
    this._logger.log('create: start create');
    return await this.sessionDevicesService.create(createSessionDeviceDto);
  }

  @Get(':sessionId')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findAllDevicesForSession(@Param('sessionId') sessionId: string): Promise<Device[]> {
    this._logger.log('findAllDevicesForSession: start findAllDevicesForSession');
    return await this.sessionDevicesService.findAllDevicesForSession(sessionId);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('sessionId') sessionId: string) {
    this._logger.log('remove: start remove');
    return this.sessionDevicesService.remove(sessionId);
  }
}
