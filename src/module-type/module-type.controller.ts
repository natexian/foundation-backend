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

import { ModuleTypeService } from './module-type.service';
import { ModuleTypeDto } from './dto/module-type.dto';

@ApiTags('module-type')
@Controller('module-type')
export class ModuleTypeController {
  private _logger = new Logger('ModuleTypeController');
  constructor(private readonly moduleTypeService: ModuleTypeService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createModuleTypeDto: ModuleTypeDto) {
    this._logger.log('create: start create');
    return this.moduleTypeService.create(createModuleTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll() {
    this._logger.log('findAll: start findAll');
    return this.moduleTypeService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findOne(@Param('id') id: ObjectId) {
    this._logger.log('findOne: start findOne');
    return this.moduleTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: ObjectId,
    @Body() updateModuleTypeDto: ModuleTypeDto
  ) {
    this._logger.log('update: start update');
    return this.moduleTypeService.update(id, updateModuleTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: ObjectId) {
    this._logger.log('remove: start remove');
    return this.moduleTypeService.remove(id);
  }
}
