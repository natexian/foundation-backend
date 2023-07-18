import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty({
    example: 'Note Description',
    description:
      'Description of the note to be shown to the maestro of the game',
  })
  Description: string;
}
