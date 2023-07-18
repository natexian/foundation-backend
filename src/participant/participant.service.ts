import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Participant } from './entities/participant.entity';
import { ParticipantDto } from './dto/participant.dto';
import { Activity } from '../activity/entities/activity.entity';

@Injectable()
export class ParticipantService {
  private _logger = new Logger('ParticipantService');

  constructor(
    @InjectRepository(Participant)
    private _participantRepository: Repository<Participant>,
    @InjectRepository(Activity)
    private _activityRepository: Repository<Activity>
  ) {}

  async create(participantDto: ParticipantDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    if (!participantDto.FirstName) {
      throw new BadRequestException('Invalid First Name.');
    } else if (!participantDto.LastName) {
      throw new BadRequestException('Invalid Last Name.');
    } else if (!participantDto.ProfilePictureURL) {
      throw new BadRequestException('Invalid ProfilePictureURL.');
    } else if (!participantDto.GroupId) {
      throw new BadRequestException('Invalid GroupId.');
    } else if (!participantDto.LocaleId) {
      throw new BadRequestException('Invalid LocaleId.');
    } 
    const participant = this._participantRepository.create({
      FirstName: participantDto.FirstName,
      LastName: participantDto.LastName,
      ProfilePictureURL: participantDto.ProfilePictureURL,
      GroupId: participantDto.GroupId,
      LocaleId: participantDto.LocaleId,
      CreatedOn: new Date(),
      ModifiedOn: new Date(),
      IsActive: true,
    });
    await this._participantRepository.insert(participant);
    return participant._id;
  }

  async findAll(): Promise<Participant[]> {
    this._logger.log('findAll: start findAll');
    return await this._participantRepository.find({
      where: {
        IsActive: true,
      },
    });
  }

  async findOne(participantId: string): Promise<Participant> {
    this._logger.log('findOne: start findOne');
    const existingRecord = await this._participantRepository.findOne({
      where: { _id: new ObjectId(participantId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `Participant ${participantId} does not exist.`
      );
    }
    return existingRecord;
  }

  async update(
    id: string,
    updateActivityTypeDto: ParticipantDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');
    const existingRecord = await this.findOne(id);
    await this._participantRepository.update(id, {
      FirstName: updateActivityTypeDto.FirstName ?? existingRecord.FirstName,
      LastName: updateActivityTypeDto.LastName ?? existingRecord.LastName,
      ProfilePictureURL: updateActivityTypeDto.ProfilePictureURL ?? existingRecord.ProfilePictureURL,
      GroupId: updateActivityTypeDto.GroupId ?? existingRecord.GroupId,
      LocaleId: updateActivityTypeDto.LocaleId ?? existingRecord.LocaleId,
      ModifiedOn: new Date(),
    });
    return new ObjectId(id);
  }

  async remove(id: string) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this._participantRepository.update(id, {
      ModifiedOn: new Date(),
      IsActive: false,
    });
    return id;
  }

  async anonymize(id: string){
    this._logger.log('anonymize: start anonymize');
    const existingRecord = await this.findOne(id);
    await this._participantRepository.update(id, {
      FirstName: randomUUID().substring(0,8),
      LastName: randomUUID().substring(0,8),
      ProfilePictureURL: `https://cdn-icons-png.flaticon.com/512/610/610120.png`,
      ModifiedOn: new Date(),
    });
    return id;
  }

  async findActivities(id: string): Promise<Activity[]> {
    this._logger.log('findActivities: start findActivities');
    return await this._activityRepository.find({
      where: {
        IsActive: true,
        ParticipantId: id
      },
    });
  }
}
