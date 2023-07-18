import { ApiProperty } from '@nestjs/swagger';

export class TargetDto {
  @ApiProperty({
    example: 'council-screen',
    description:
      'Screen names of target screens',
  })
  Name: string;
}
