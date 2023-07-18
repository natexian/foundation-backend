import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

import { LocaleService } from './locale.service';
import { LocaleDto } from './dto/locale.dto';
import { Locale } from './entities/locale.entity';

@ApiTags('locale')
@Controller('locale')
export class LocaleController {
  private _logger = new Logger('ActivityTypeController');
  constructor(private readonly localeService: LocaleService) { }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(
    @Body() createActivityTypeDto: LocaleDto
  ): Promise<ObjectId> {
    this._logger.log('create: start create');
    return await this.localeService.create(createActivityTypeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findAll(): Promise<Locale[]> {
    this._logger.log('findAll: start findAll');
    return this.localeService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string): Promise<Locale> {
    this._logger.log('findOne: start findOne');
    return await this.localeService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateActivityTypeDto: LocaleDto
  ) {
    this._logger.log('update: start update');
    return this.localeService.update(id, updateActivityTypeDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    this._logger.log('remove: start remove');
    return this.localeService.remove(id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The data has been successfully loaded.',
  })
  async loadData(@Param('id') id: string) {
    this._logger.log('loadData: start loadData');
    return await this.localeService.loadData(id);
  }
}
