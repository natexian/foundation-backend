import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  private _logger = new Logger('NotificationsService');

  constructor(
    @InjectRepository(Notification)
    private _notificationRepository: Repository<Notification>
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    this._logger.log('create: start create');
    if (!createNotificationDto.Message) {
      throw new BadRequestException('Invalid message for notification.');
    } else if (!createNotificationDto.StepId) {
      throw new BadRequestException('Invalid step id for notification.');
    }
    const notification = this._notificationRepository.create({
      StepId: createNotificationDto.StepId,
      Message: createNotificationDto.Message,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._notificationRepository.insert(notification);
    return notification._id;
  }

  async findAllNotificationsForStep(stepId: ObjectId): Promise<Notification[]> {
    this._logger.log('findAll: start findAll');
    return await this._notificationRepository.find({
      where: {
        StepId: stepId.toString(),
        IsActive: true,
      },
    });
  }

  async findOne(notificationId: ObjectId): Promise<Notification> {
    this._logger.log(`findOne: start findOne with ${notificationId}`);
    const existingRecord = await this._notificationRepository.findOne({
      where: { _id: new ObjectId(notificationId), IsActive: true },
    });

    if (!existingRecord) {
      throw new NotFoundException(
        `Notification with ${notificationId} does not exist.`
      );
    }
    return existingRecord;
  }

  async update(
    id: ObjectId,
    updateNotificationDto: UpdateNotificationDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._notificationRepository.update(id, {
      Message: updateNotificationDto.Message ?? existingRecord.Message,
      ModifiedOn: new Date(),
    });
    return id;
  }

  async remove(id: ObjectId) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._notificationRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }
}
