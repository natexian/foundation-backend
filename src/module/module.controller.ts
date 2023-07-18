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


import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { ModuleEntity } from './entities/module.entity';
import { UpdateModuleDto } from './dto/update-module.dto';

@ApiTags('module')
@Controller('module')
export class ModuleController {
  private _logger = new Logger('ModuleController');
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() createActivityTypeDto: CreateModuleDto
  ): Promise<ObjectId> {
    this._logger.log('create: start create');
    return await this.moduleService.create(createActivityTypeDto);
  }

  @Get(':moduleId')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('moduleId') moduleId: ObjectId){
    this._logger.log('findOne: start findOne');
    return await this.moduleService.findOne(moduleId);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: ObjectId,
    @Body() updateActivityTypeDto: UpdateModuleDto
  ) {
    this._logger.log('update: start update');
    return this.moduleService.update(id, updateActivityTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: ObjectId) {
    this._logger.log('remove: start remove');
    return this.moduleService.remove(id);
  }
}
