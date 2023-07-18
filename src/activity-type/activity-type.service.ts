import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { ActivityType } from './entities/activity-type.entity';
import { ActivityTypeDto } from './dto/activity-type.dto';

@Injectable()
export class ActivityTypeService {
  private _logger = new Logger('ActivityTypeService');

  constructor(
    @InjectRepository(ActivityType)
    private _activityTypeRepository: Repository<ActivityType>
  ) {}

  async create(createActivityTypeDto: ActivityTypeDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!createActivityTypeDto.ActivityTypeName) {
      throw new BadRequestException('Invalid activity type name.');
    }
    const activityType = this._activityTypeRepository.create({
      ActivityTypeName: createActivityTypeDto.ActivityTypeName,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._activityTypeRepository.insert(activityType);
    return activityType._id;
  }

  async findAll(): Promise<ActivityType[]> {
    this._logger.log('findAll: start findAll');
    return await this._activityTypeRepository.find({
      where: {
        IsActive: true,
      },
    });
  }

  async findOne(activityTypeId: ObjectId): Promise<ActivityType> {
    this._logger.log('findOne: start findOne');
    const existingRecord = await this._activityTypeRepository.findOne({
      where: { _id: new ObjectId(activityTypeId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `Activity Type with ${activityTypeId} does not exist.`
      );
    }
    return existingRecord;
  }

  async update(
    id: ObjectId,
    updateActivityTypeDto: ActivityTypeDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._activityTypeRepository.update(id, {
      ActivityTypeName:
        updateActivityTypeDto.ActivityTypeName ??
        existingRecord.ActivityTypeName,
      ModifiedOn: new Date(),
    });
    return id;
  }

  async remove(id: ObjectId) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._activityTypeRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }
}
