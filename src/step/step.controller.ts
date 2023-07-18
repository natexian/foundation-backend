import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { StepService } from './step.service';
import { StepDto } from './dto/step.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

@ApiTags('step')
@Controller('step')
export class StepController {
  private _logger = new Logger('StepController');
  constructor(private readonly stepService: StepService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(@Body() createStepDto: StepDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    return this.stepService.create(createStepDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The records have been successfully retrieved.',
  })
  findAll() {
    this._logger.log('findAll: start findAll');
    return this.stepService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id') id: string) {
    this._logger.log('findOne: start findOne');
    return await this.stepService.findOne(id);
  }

  @Get(':id/next')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findNext(@Param('id') id: string) {
    this._logger.log('findOne: start findNext');
    return await this.stepService.findNext(id);
  }

  @Get(':id/previous')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findPrevious(@Param('id') id: string) {
    this._logger.log('findOne: start findPrevious');
    return await this.stepService.findPrevious(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateStepDto: StepDto
  ) {
    this._logger.log('update: start update');
    return await this.stepService.update(id, updateStepDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  async remove(@Param('id') id: string) {
    this._logger.log('remove: start remove');
    return await this.stepService.remove(id);
  }
}
