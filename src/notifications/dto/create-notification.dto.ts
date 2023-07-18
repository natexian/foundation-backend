import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    example: '6492adc14c7d307853abf854',
    description:
      'stepId of the current step where the interaction is occurring',
  })
  StepId: string;

  @ApiProperty({
    example: `You've been awarded a new badge`,
    description:
      'Notification message to display to the user',
  })
  Message: string;
}
