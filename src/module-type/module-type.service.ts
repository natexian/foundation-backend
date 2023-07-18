import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { ModuleTypeDto } from './dto/module-type.dto';
import { ModuleType } from './entities/module-type.entity';

@Injectable()
export class ModuleTypeService {
  private _logger = new Logger('ModuleTypeService');

  constructor(
    @InjectRepository(ModuleType)
    private _moduleTypeRepository: Repository<ModuleType>
  ) {}

  async create(createModuleTypeDto: ModuleTypeDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!createModuleTypeDto.ModuleTypeName) {
      throw new BadRequestException('Invalid module type name.');
    }
    const moduleType = this._moduleTypeRepository.create({
      ModuleTypeName: createModuleTypeDto.ModuleTypeName,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._moduleTypeRepository.insert(moduleType);
    return moduleType._id;
  }

  async findAll(): Promise<ModuleType[]> {
    this._logger.log('findAll: start findAll');
    return await this._moduleTypeRepository.find({
      where: {
        IsActive: true,
      },
    });
  }

  async findOne(moduleTypeId: ObjectId): Promise<ModuleType> {
    this._logger.log('findOne: start findOne');
    const existingRecord = await this._moduleTypeRepository.findOne({
      where: { _id: new ObjectId(moduleTypeId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `Module Type with ${moduleTypeId} does not exist.`
      );
    }
    return existingRecord;
  }

  async update(
    id: ObjectId,
    updateModuleTypeDto: ModuleTypeDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._moduleTypeRepository.update(id, {
      ModuleTypeName:
        updateModuleTypeDto.ModuleTypeName ?? existingRecord.ModuleTypeName,
      ModifiedOn: new Date(),
    });
    return id;
  }

  async remove(id: ObjectId) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._moduleTypeRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }
}
