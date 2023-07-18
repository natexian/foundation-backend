import { ApiProperty } from '@nestjs/swagger';

export class ModuleTypeDto {
  @ApiProperty({
    example: 'Audio',
    description: 'Type of module available for steps',
  })
  ModuleTypeName: string;
}
