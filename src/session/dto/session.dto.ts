import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
  @ApiProperty({
    example: 'Undergrads_Batch_1_Game_1',
    description:
      'Name of the session',
  })
  SessionName: string;

  @ApiProperty({
    example: '64954f3410596cf32f61af41',
    description:
      'Locale Id for the session',
  })
  LanguageId: string;

  @ApiProperty({
    example: '648c3cbb6956eb3c166e98d9',
    description:
      'Step Id of the current Step',
  })
  CurrentStepId: string;
}
