import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  private _logger = new Logger('NotesService');

  constructor(
    @InjectRepository(Note)
    private _noteRepository: Repository<Note>
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    this._logger.log('create: start create');
    if (!createNoteDto.Description) {
      throw new BadRequestException('Invalid description for note.');
    } else if (!createNoteDto.StepId) {
      throw new BadRequestException('Invalid step id for note.');
    }

    const note = this._noteRepository.create({
      StepId: createNoteDto.StepId,
      Description: createNoteDto.Description,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._noteRepository.insert(note);
    return note._id;
  }

  async findAllNotesForStep(stepId: ObjectId): Promise<Note[]> {
    this._logger.log('findAll: start findAll');
    return await this._noteRepository.find({
      where: {
        StepId: stepId.toString(),
        IsActive: true,
      },
    });
  }

  async findOne(noteId: ObjectId): Promise<Note> {
    this._logger.log(`findOne: start findOne with ${noteId}`);
    const existingRecord = await this._noteRepository.findOne({
      where: { _id: new ObjectId(noteId), IsActive: true },
    });

    if (!existingRecord) {
      throw new NotFoundException(`Note with ${noteId} does not exist.`);
    }
    return existingRecord;
  }

  async update(id: ObjectId, updateNoteDto: UpdateNoteDto): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._noteRepository.update(id, {
      Description: updateNoteDto.Description ?? existingRecord.Description,
      ModifiedOn: new Date(),
    });
    return id;
  }

  async remove(id: ObjectId) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._noteRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }
}
