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

import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@ApiTags('device')
@Controller('device')
export class DeviceController {
  private _logger = new Logger('DeviceController');
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    this._logger.log('create: start create');
    return await this.deviceService.create(createDeviceDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(): Promise<Device[]> {
    this._logger.log('findAll: start findAll');
    return this.deviceService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: ObjectId) {
    this._logger.log('findOne: start findOne');
    return await this.deviceService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: ObjectId,
    @Body() updateDeviceDto: UpdateDeviceDto
  ) {
    this._logger.log('update: start update');
    return this.deviceService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: ObjectId) {
    this._logger.log('remove: start remove');
    return this.deviceService.remove(id);
  }
}
