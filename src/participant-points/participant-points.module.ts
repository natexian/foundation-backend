import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParticipantPointsService } from './participant-points.service';
import { ParticipantPointsController } from './participant-points.controller';
import { ParticipantPoint } from './entities/participant-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParticipantPoint])],
  controllers: [ParticipantPointsController],
  providers: [ParticipantPointsService]
})
export class ParticipantPointsModule {}
