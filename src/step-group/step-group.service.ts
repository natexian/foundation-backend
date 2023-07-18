import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { StepGroupDto } from './dto/step-group.dto';
import { StepGroup } from './entities/step-group.entity';
import { Step } from '../step/entities/step.entity';

@Injectable()
export class StepGroupService {
  constructor(
    @InjectRepository(StepGroup)
    private _stepGroupRepository: Repository<StepGroup>,
    @InjectRepository(Step)
    private _stepRepository: Repository<Step>
  ) {}

  async create(createStepGroupDto: StepGroupDto): Promise<ObjectId> {
    if (!createStepGroupDto.StepGroupName) {
      throw new BadRequestException(`Invalid step group name.`);
    }
    const stepGroup = this._stepGroupRepository.create({
      StepGroupName: createStepGroupDto.StepGroupName,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._stepGroupRepository.insert(stepGroup);
    return stepGroup._id;
  }

  async findAll(): Promise<StepGroup[]> {
    return await this._stepGroupRepository.find({
      where: {
        IsActive: true,
      },
    });
  }

  async findOne(stepGroupId: string): Promise<StepGroup> {
    const existingRecord = await this._stepGroupRepository.findOne({
      where: { _id: new ObjectId(stepGroupId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `Step group with ${stepGroupId} does not exist.`
      );
    }
    return existingRecord;
  }

  async findSteps(stepGroupId: string): Promise<Step[]> {
    const existingRecord = await this._stepGroupRepository.findOne({
      where: { _id: new ObjectId(stepGroupId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `Step group ${stepGroupId} does not exist.`
      );
    }
    return await this._stepRepository.find({
      where: {
        StepGroupId: String(stepGroupId),
        IsActive: true,
      },
      order: {
        StepNumber: 'ASC',
      }
    });
  }

  async update(
    id: string,
    updateStepGroupDto: StepGroupDto
  ): Promise<ObjectId> {
    const existingRecord = await this.findOne(id);
    await this._stepGroupRepository.update(new ObjectId(id), {
      StepGroupName:
        updateStepGroupDto.StepGroupName ?? existingRecord.StepGroupName,
      ModifiedOn: new Date(),
    });
    return new ObjectId(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this._stepGroupRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }
}
