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

import { DeviceTypeService } from './device-type.service';
import { DeviceTypeDto } from './dto/device-type.dto';
import { DeviceType } from './entities/device-type.entity';

@ApiTags('device-type')
@Controller('device-type')
export class DeviceTypeController {
  private _logger = new Logger('DeviceTypeController');
  constructor(private readonly deviceTypeService: DeviceTypeService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() createDeviceTypeDto: DeviceTypeDto
  ): Promise<ObjectId> {
    this._logger.log('create: start create');
    return await this.deviceTypeService.create(createDeviceTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(): Promise<DeviceType[]> {
    this._logger.log('findAll: start findAll');
    return this.deviceTypeService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: ObjectId) {
    this._logger.log('findOne: start findOne');
    return await this.deviceTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: ObjectId,
    @Body() updateDeviceTypeDto: DeviceTypeDto
  ) {
    this._logger.log('update: start update');
    return this.deviceTypeService.update(id, updateDeviceTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: ObjectId) {
    this._logger.log('remove: start remove');
    return this.deviceTypeService.remove(id);
  }
}
