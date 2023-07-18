import { ApiProperty } from '@nestjs/swagger';

export class ModuleTargetDto {
  @ApiProperty({
    example: '64896c0ebb2f3b50a0110728',
    description: 'Id of the target to which current module is targeting',
  })
  TargetId: string;

  @ApiProperty({
    example: '64896c0ebb2f3b50a0110728',
    description: 'Id of the module of the current module',
  })
  ModuleId: string;
}
