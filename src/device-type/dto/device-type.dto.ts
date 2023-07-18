import { ApiProperty } from '@nestjs/swagger';

export class DeviceTypeDto {
  @ApiProperty({
    example: 'Projector',
    description:
      'Type of device which will be connected to the game',
  })
  DeviceTypeName: string;

  @ApiProperty({
    example: 'PROJ',
    description:
      'Device type code to identify devices efficiently',
  })
  DeviceTypeCode: string;
}
