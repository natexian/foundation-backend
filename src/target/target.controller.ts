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

import { TargetService } from './target.service';
import { TargetDto } from './dto/target.dto';
import { Target } from './entities/target.entity';

@ApiTags('target')
@Controller('target')
export class TargetController {
  private _logger = new Logger('TargetController');
  constructor(private readonly targetService: TargetService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createTargetDto: TargetDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    return this.targetService.create(createTargetDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(): Promise<Target[]> {
    this._logger.log('findAll: start findAll');
    return this.targetService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: ObjectId) {
    this._logger.log('findOne: start findOne');
    return this.targetService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: ObjectId, @Body() updateTargetDto: TargetDto) {
    this._logger.log('update: start update');
    return this.targetService.update(id, updateTargetDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: ObjectId) {
    this._logger.log('remove: start remove');
    return this.targetService.remove(id);
  }
}
