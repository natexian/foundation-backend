import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { ObjectId } from 'mongodb';

import { CreateModuleDto } from './dto/create-module.dto';
import { ModuleEntity } from './entities/module.entity';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModuleTargetsService } from '../module-targets/module-targets.service';
import { ModuleTarget } from '../module-targets/entities/module-target.entity';
import { Target } from '../target/entities/target.entity';
import { response } from 'express';

@Injectable()
export class ModuleService {
  private _logger = new Logger('ModuleService');

  constructor(
    @InjectRepository(ModuleEntity)
    private _moduleRepository: Repository<ModuleEntity>,
    @InjectRepository(ModuleTarget)
    private _moduleTargetsRepository?: Repository<ModuleTarget>,
    @InjectRepository(Target)
    private _targetRepository?: Repository<Target>
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!createModuleDto.StepId) {
      throw new BadRequestException('Invalid step id.');
    } else if (!createModuleDto.ModuleTypeId) {
      throw new BadRequestException('Invalid module type id.');
    }

    const module = this._moduleRepository.create({
      StepId: createModuleDto.StepId,
      ModuleTypeId: createModuleDto.ModuleTypeId,
      Label: createModuleDto.Label,
      Sequences: createModuleDto.Sequences,
      Text: createModuleDto.Text,
      Track: createModuleDto.Track,
      Url: createModuleDto.Url,
      Stop: createModuleDto.Stop ?? false,
      Title: createModuleDto.Title,
      Autoplay: createModuleDto.Stop ?? false,
      Loop: createModuleDto.Stop ?? false,
      Volume: createModuleDto.Volume,
      ShowCurrentSession: createModuleDto.Stop ?? false,
      Color: createModuleDto.Color,
      Logo: createModuleDto.Stop ?? false,
      AutoNextOnEnd: createModuleDto.Stop ?? false,
      Dim: createModuleDto.Stop ?? false,
      AutoStart: createModuleDto.Stop ?? false,
      Duration: createModuleDto.Duration,
      Value: createModuleDto.Value,
      WithGroupId: createModuleDto.Stop ?? false,
      Args: createModuleDto.Args,
      PersistId: createModuleDto.PersistId,
      Assignment: createModuleDto.Stop ?? false,
      Variant: createModuleDto.Variant,
      Badge: createModuleDto.Badge,
      Topics: createModuleDto.Topics,
      Pools: createModuleDto.Pools,
      EventPrefix: createModuleDto.EventPrefix,
      UnderstoodKey: createModuleDto.UnderstoodKey,
      ShowMediaControls: createModuleDto.Stop ?? false,
      SeriesPropertyName: createModuleDto.SeriesPropertyName,
      Content: createModuleDto.Content,
      NonMoversOnly: createModuleDto.Stop ?? false,
      Groups: createModuleDto.Groups,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });

    await this._moduleRepository.insert(module);

    if (createModuleDto.Targets.length > 0) {
      this.updateTargetsForModule(module._id, createModuleDto.Targets);
    }

    return module._id;
  }

  async findOne(moduleId: ObjectId): Promise<ModuleEntity> {
    this._logger.log('findOne: start findOne');
    let existingRecord = await this._moduleRepository.findOne({
      where: { _id: new ObjectId(moduleId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(`Module with ${moduleId} does not exist.`);
    }

    return await this.processModuleTargets(existingRecord);
  }

  async update(
    moduleId: ObjectId,
    updateModuleTypeDto: UpdateModuleDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(moduleId);
    await this._moduleRepository.update(moduleId, {
      Label: updateModuleTypeDto.Label ?? existingRecord.Label,
      Sequences: updateModuleTypeDto.Sequences ?? existingRecord.Sequences,
      Text: updateModuleTypeDto.Text ?? existingRecord.Text,
      Track: updateModuleTypeDto.Track ?? existingRecord.Track,
      Url: updateModuleTypeDto.Url ?? existingRecord.Url,
      Stop: updateModuleTypeDto.Stop ?? existingRecord.Stop,
      Title: updateModuleTypeDto.Title ?? existingRecord.Title,
      Autoplay: updateModuleTypeDto.Stop ?? existingRecord.Autoplay,
      Loop: updateModuleTypeDto.Stop ?? existingRecord.Loop,
      Volume: updateModuleTypeDto.Volume ?? existingRecord.Volume,
      ShowCurrentSession:
        updateModuleTypeDto.Stop ?? existingRecord.ShowCurrentSession,
      Color: updateModuleTypeDto.Color ?? existingRecord.Color,
      Logo: updateModuleTypeDto.Stop ?? existingRecord.Logo,
      AutoNextOnEnd: updateModuleTypeDto.Stop ?? existingRecord.AutoNextOnEnd,
      Dim: updateModuleTypeDto.Stop ?? existingRecord.Dim,
      AutoStart: updateModuleTypeDto.Stop ?? existingRecord.AutoStart,
      Duration: updateModuleTypeDto.Duration ?? existingRecord.Duration,
      Value: updateModuleTypeDto.Value ?? existingRecord.Value,
      WithGroupId: updateModuleTypeDto.Stop ?? existingRecord.WithGroupId,
      Args: updateModuleTypeDto.Args ?? existingRecord.Args,
      PersistId: updateModuleTypeDto.PersistId ?? existingRecord.PersistId,
      Assignment: updateModuleTypeDto.Stop ?? existingRecord.Assignment,
      Variant: updateModuleTypeDto.Variant ?? existingRecord.Variant,
      Badge: updateModuleTypeDto.Badge ?? existingRecord.Badge,
      Topics: updateModuleTypeDto.Topics ?? existingRecord.Topics,
      Pools: updateModuleTypeDto.Pools ?? existingRecord.Pools,
      EventPrefix:
        updateModuleTypeDto.EventPrefix ?? existingRecord.EventPrefix,
      UnderstoodKey:
        updateModuleTypeDto.UnderstoodKey ?? existingRecord.UnderstoodKey,
      ShowMediaControls:
        updateModuleTypeDto.Stop ?? existingRecord.ShowMediaControls,
      SeriesPropertyName:
        updateModuleTypeDto.SeriesPropertyName ??
        existingRecord.SeriesPropertyName,
      Content: updateModuleTypeDto.Content ?? existingRecord.Content,
      NonMoversOnly: updateModuleTypeDto.Stop ?? existingRecord.NonMoversOnly,
      Groups: updateModuleTypeDto.Groups ?? existingRecord.Groups,
      ModifiedOn: new Date(),
    });

    if (
      !updateModuleTypeDto.Targets &&
      updateModuleTypeDto.Targets.length > 0
    ) {
      this.updateTargetsForModule(moduleId, updateModuleTypeDto.Targets);
    }

    return moduleId;
  }

  async remove(id: ObjectId) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._moduleRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }

  async findAllModulesForStep(stepId: string): Promise<ModuleEntity[]> {
    this._logger.log('findAllModulesForStep: start findAllModulesForStep');
    let existingRecords = await this._moduleRepository.find({
      where: { StepId: stepId, IsActive: true },
    });
    if (!existingRecords || existingRecords.length == 0) {
      throw new NotFoundException(`No modules with step id ${stepId}.`);
    }

    return await this.processModule(existingRecords);
  }

  async processModule(modules: ModuleEntity[]): Promise<ModuleEntity[]> {
    this._logger.log('processModule: start processModule');
    const requests = [];
    modules.forEach((module) => {
      requests.push(this.processModuleTargets(module));
    });

    return await Promise.all<ModuleEntity[]>(requests).then(
      async (response) => {
        return response;
      }
    );
  }

  async processModuleTargets(module: ModuleEntity): Promise<ModuleEntity> {
    this._logger.log('processModuleTargets: start processModuleTargets');
    const targetsForModule = await this.retrieveTargetsForModule(module._id);

    if (targetsForModule.length > 0) {
      targetsForModule.map((moduleTarget: ModuleTarget) => {
        module.Targets.push(moduleTarget.TargetId);
      });
    }

    return module;
  }

  async updateTargetsForModule(moduleId: ObjectId, targetIds: string[]) {
    this._logger.log('updateTargetsForModule: start updateTargetsForModule');
    await new ModuleTargetsService(
      this._moduleTargetsRepository,
      this._moduleRepository,
      this._targetRepository
    ).update(moduleId, targetIds);
  }

  async retrieveTargetsForModule(moduleId: ObjectId): Promise<ModuleTarget[]> {
    this._logger.log(
      'retrieveTargetsForModule: start retrieveTargetsForModule'
    );
    return await new ModuleTargetsService(
      this._moduleTargetsRepository,
      this._moduleRepository,
      this._targetRepository
    ).findAll(moduleId);
  }
}
