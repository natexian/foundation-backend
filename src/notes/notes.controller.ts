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

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  private _logger = new Logger('NotesController');
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createNoteDto: CreateNoteDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    return this.notesService.create(createNoteDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  findOne(@Param('id') id: ObjectId) {
    this._logger.log('findOne: start findOne');
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: ObjectId, @Body() updateNoteDto: UpdateNoteDto) {
    this._logger.log('update: start update');
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: ObjectId) {
    this._logger.log('remove: start remove');
    return this.notesService.remove(id);
  }
}
