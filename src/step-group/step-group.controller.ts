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
import { ObjectId } from 'typeorm';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { StepGroupService } from './step-group.service';
import { StepGroupDto } from './dto/step-group.dto';
import { Step } from '../step/entities/step.entity';
import { StepGroup } from './entities/step-group.entity';

@ApiTags('step-group')
@Controller('step-group')
export class StepGroupController {
  private _logger = new Logger('StepGroupController');
  constructor(private readonly stepGroupService: StepGroupService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createStepGroupDto: StepGroupDto) {
    this._logger.log('create: start create');
    return this.stepGroupService.create(createStepGroupDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(): Promise<StepGroup[]> {
    this._logger.log('findAll: start findAll');
    return this.stepGroupService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findOne(@Param('id') id: string): Promise<StepGroup> {
    this._logger.log('findOne: start findOne');
    return this.stepGroupService.findOne(id);
  }

  @Get(':id/steps')
  @ApiResponse({
    status: 200,
    description: 'The records have been successfully retrieved.',
  })
  findSteps(@Param('id') id: string): Promise<Step[]> {
    this._logger.log('findSteps: start findSteps');
    return this.stepGroupService.findSteps(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateStepGroupDto: StepGroupDto) {
    this._logger.log('update: start update');
    return this.stepGroupService.update(id, updateStepGroupDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    this._logger.log('remove: start remove');
    return this.stepGroupService.remove(id);
  }
}
