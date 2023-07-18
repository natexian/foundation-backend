import { Module } from '@nestjs/common';
import { ParticipantGroupService } from './participant-group.service';
import { ParticipantGroupController } from './participant-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantGroup } from './entities/participant-group.entity';
import { Participant } from '../participant/entities/participant.entity';
import { ParticipantService } from '../participant/participant.service';
import { Activity } from '../activity/entities/activity.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ParticipantGroup, Participant, Activity])],
  controllers: [ParticipantGroupController],
  providers: [ParticipantGroupService, ParticipantService],
})
export class ParticipantGroupModule {}
