import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { TargetDto } from './dto/target.dto';
import { Target } from './entities/target.entity';

@Injectable()
export class TargetService {
  private _logger = new Logger('TargetService');

  constructor(
    @InjectRepository(Target)
    private _targetRepository: Repository<Target>
  ) {}

  async create(createTargetDto: TargetDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!createTargetDto.Name) {
      throw new BadRequestException('Invalid target name.');
    }
    const target = this._targetRepository.create({
      Name: createTargetDto.Name,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._targetRepository.insert(target);
    return target._id;
  }

  async findAll(): Promise<Target[]> {
    this._logger.log('findAll: start findAll');
    return await this._targetRepository.find({
      where: {
        IsActive: true,
      },
    });
  }

  async findOne(targetId: ObjectId): Promise<Target> {
    this._logger.log('findOne: start findOne');
    const existingRecord = await this._targetRepository.findOne({
      where: { _id: new ObjectId(targetId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(`Target with ${targetId} does not exist.`);
    }
    return existingRecord;
  }

  async update(id: ObjectId, updateTargetDto: TargetDto): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._targetRepository.update(id, {
      Name: updateTargetDto.Name ?? existingRecord.Name,
      ModifiedOn: new Date(),
    });
    return id;
  }

  async remove(id: ObjectId) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._targetRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }
}
