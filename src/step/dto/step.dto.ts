import { ApiProperty } from '@nestjs/swagger';

export class StepDto {
  @ApiProperty({
    example: 'bankingCrisis',
    description:
      'Step Name associated with the current step',
  })
  StepName: string;

  @ApiProperty({
    example: 'Banking Crisis',
    description:
      'Title of the current step',
  })
  Title: string;

  @ApiProperty({
    example: '4',
    description:
      'scene number, within the act, of the step',
  })
  Scene: string;

  @ApiProperty({
    example: '3',
    description:
      'act number of the step',
  })
  Act: string;

  @ApiProperty({
    example: '3400',
    description:
      'stepNumber of the step',
  })
  StepNumber: number;

  @ApiProperty({
    example: '64896c0ebb2f3b50a0110728',
    description:
      'id of the stepGroup to which current step is a part of',
  })
  StepGroupId: string;
}
