import { ApiProperty } from '@nestjs/swagger';

export class StepGroupDto {
  @ApiProperty({
    example: 'horisont-act-4',
    description:
      'Name given to the collection of steps',
  })
  StepGroupName: string;
}
