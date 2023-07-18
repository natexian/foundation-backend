import { ApiProperty } from '@nestjs/swagger';

export class ParticipantPointDto {
  @ApiProperty({
    example: '6492adc14c7d307853abf854',
    description: 'Id of the step to which current module is a part of',
  })
  StepId: string;

  @ApiProperty({
    example: '64896c0ebb2f3b50a0110728',
    description: 'Id of the participant attending the session',
  })
  ParticipantId: string;

  @ApiProperty({
    example: '649bc13fc422411a5f82d278',
    description: 'Id of the session to which the current participant is part of',
  })
  SessionId: string;

  @ApiProperty({
    example: 10,
    description: 'Points earned by a participant for a given step',
  })
  Points: number;
}
