import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { ModuleTargetDto } from './dto/module-target.dto';
import { ModuleTarget } from './entities/module-target.entity';
import { ModuleEntity } from '../module/entities/module.entity';
import { ModuleService } from '../module/module.service';
import { Target } from '../target/entities/target.entity';
import { TargetService } from '../target/target.service';

@Injectable()
export class ModuleTargetsService {
  private _logger = new Logger('ModuleTargetsService');

  constructor(
    @InjectRepository(ModuleTarget)
    private _moduleTargetsRepository: Repository<ModuleTarget>,
    @InjectRepository(ModuleEntity)
    private _moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(Target)
    private _targetRepository: Repository<Target>
  ) {}

  async create(createModuleTargetDto: ModuleTargetDto): Promise<ObjectId> {
    this._logger.log('create: start create');

    if (!createModuleTargetDto.TargetId) {
      throw new BadRequestException('Invalid target id.');
    } else if (!createModuleTargetDto.ModuleId) {
      throw new BadRequestException('Invalid module id.');
    }

    await new ModuleService(
      this._moduleRepository,
      this._moduleTargetsRepository,
      this._targetRepository
    ).findOne(new ObjectId(createModuleTargetDto.ModuleId));

    await new TargetService(this._targetRepository).findOne(
      new ObjectId(createModuleTargetDto.TargetId)
    );

    const moduleTargets = this._moduleTargetsRepository.create({
      TargetId: createModuleTargetDto.TargetId,
      ModuleId: createModuleTargetDto.ModuleId,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._moduleTargetsRepository.insert(moduleTargets);
    return moduleTargets._id;
  }

  async findAll(moduleId: ObjectId): Promise<ModuleTarget[]> {
    this._logger.log('findAll: start findAll');
    return await this._moduleTargetsRepository.find({
      where: {
        ModuleId: moduleId.toString(),
        IsActive: true,
      },
    });
  }

  async update(moduleId: ObjectId, updateModuleTargetDto: string[]) {
    this._logger.log('update: start update');

    const existingRecord = await this.findAll(moduleId);
    if (existingRecord.length > 0) {
      await this.remove(moduleId);
    }

    updateModuleTargetDto.map(async (targets) => {
      await this.create({
        ModuleId: moduleId.toString(),
        TargetId: targets,
      });
    });

    return 'Successfully updated targets for module';
  }

  async remove(moduleId: ObjectId) {
    this._logger.log('remove: start remove');
    await this._moduleTargetsRepository.delete({
      ModuleId: moduleId.toString(),
    });
    return moduleId;
  }
}
