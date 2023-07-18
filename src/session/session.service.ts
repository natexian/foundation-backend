import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
  MethodNotAllowedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Session } from './entities/session.entity';
import { SessionDto } from './dto/session.dto';
import { LocaleService } from '../locale/locale.service';
import { StepService } from '../step/step.service';

@Injectable()
export class SessionService {
  private _logger = new Logger('SessionService');
  private interval;
  private ticking: boolean = false;
  private gameTime = 0;

  constructor(
    @InjectRepository(Session)
    private _sessionRepository: Repository<Session>,
    private localeService: LocaleService,
    private stepService: StepService,
  ) {
    this.updateTime = this.updateTime.bind(this);
  }

  async create(sessionDto: SessionDto): Promise<ObjectId> {
    this._logger.log('create: start create');
    
    //throw error if the locale or step does not exist
    await this.localeService.findOne(sessionDto.LanguageId); 
    await this.stepService.findOne(sessionDto.CurrentStepId); 

    let currentSession = await this.findCurrent();
    if (currentSession) {
      throw new MethodNotAllowedException(
        `Session already in Progress. Please end the Session ${currentSession._id} to proceed with creating a new Session`
      )
    }

    const session = this._sessionRepository.create({
      SessionName: sessionDto.SessionName,
      LanguageId: sessionDto.LanguageId,
      CurrentStepId: sessionDto.CurrentStepId,
      GameTime: 0,
      StartedOn: new Date(),
      IsActive: true,
    });
    await this._sessionRepository.insert(session);
    this.togglePause(session._id);
    return session._id;
  }

  async findAll(): Promise<Session[]> {
    this._logger.log('findAll: start findAll');
    return await this._sessionRepository.find({});
  }

  async findOne(sessionId: string): Promise<Session> {
    this._logger.log('findOne: start findOne');
    const existingRecord = await this._sessionRepository.findOne({
      where: { _id: new ObjectId(sessionId), IsActive: true },
    });
    if (!existingRecord) {
      throw new NotFoundException(
        `Session ${sessionId} does not exist.`
      );
    }
    return existingRecord;
  }

  async findCurrent(): Promise<Session>{
    this._logger.log('findCurrent: start findCurrent');
    const existingRecord = await this._sessionRepository.findOne({
      where: { IsActive: true },
    });
    
    return existingRecord;
  }

  async update(
    id: string,
    updateSessionDto: SessionDto
  ): Promise<ObjectId> {
    this._logger.log('update: start update');

    //throw error if the locale or step does not exist
    if (updateSessionDto.LanguageId) await this.localeService.findOne(updateSessionDto.LanguageId); 
    if (updateSessionDto.CurrentStepId) await this.stepService.findOne(updateSessionDto.CurrentStepId);

    const existingRecord = await this.findOne(id);

    if (updateSessionDto.SessionName && updateSessionDto.SessionName != existingRecord.SessionName)
      throw  new MethodNotAllowedException(
        `SessionName, \"${existingRecord.SessionName}\" cannot be changed after session has started`
      );
    
    await this._sessionRepository.update(id, {
      LanguageId: updateSessionDto.LanguageId ? updateSessionDto.LanguageId : existingRecord.LanguageId,
      CurrentStepId: updateSessionDto.CurrentStepId ? updateSessionDto.CurrentStepId : existingRecord.CurrentStepId,
    });
    return new ObjectId(id);
  }

  async remove(id: string) {
    this._logger.log('remove: start remove');
    await this.findOne(id);
    await this.stopSessionTimer(id);
    await this._sessionRepository.update(id, {
      IsActive: false,
    });
    return id;
  }

  async updateTime(sessionId){
    const existingRecord = await this.findOne(sessionId);

    await this._sessionRepository.update(sessionId, {
      GameTime: existingRecord.GameTime + 1,
    });
  }

  startSessionTimer(sessionId){
    this.interval = setInterval(async () => {await this.updateTime(sessionId)}, 1000);
    this.ticking = true;
  }

  stopSessionTimer(sessionId) {
    clearInterval(this.interval);
    this.ticking = false;
  }

  togglePause(sessionId) {
    if (this.ticking) {
      this.stopSessionTimer(sessionId);
    } else {
      this.startSessionTimer(sessionId);
    }
  }
}
