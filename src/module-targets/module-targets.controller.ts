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

import { ModuleTargetsService } from './module-targets.service';
import { ModuleTargetDto } from './dto/module-target.dto';
import { ModuleTarget } from './entities/module-target.entity';

@ApiTags('module-targets')
@Controller('module-targets')
export class ModuleTargetsController {
  private _logger = new Logger('ModuleTargetsController');

  constructor(private readonly moduleTargetsService: ModuleTargetsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() createModuleTargetDto: ModuleTargetDto
  ): Promise<ObjectId> {
    this._logger.log('create: start create');
    return await this.moduleTargetsService.create(createModuleTargetDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(@Param('moduleId') moduleId: ObjectId): Promise<ModuleTarget[]> {
    this._logger.log('findAll: start findAll');
    return this.moduleTargetsService.findAll(moduleId);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('moduleId') moduleId: ObjectId,
    @Body() targetIds: string[]
  ) {
    this._logger.log('update: start update');
    return this.moduleTargetsService.update(moduleId, targetIds);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('moduleId') moduleId: ObjectId) {
    this._logger.log('remove: start remove');
    return this.moduleTargetsService.remove(moduleId);
  }
}
