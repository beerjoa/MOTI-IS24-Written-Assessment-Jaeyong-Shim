import { IsString, IsUUID, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TRelationshipType } from '../../entities/Relationships';

const relationshipTypes: TRelationshipType[] = [
  'parent',
  'child',
  'sibling',
  'spouse',
  'friend',
];

export class CreateRelationshipDto {
  @ApiProperty({ example: 'parent' })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsIn(relationshipTypes)
  relationship_type: TRelationshipType;

  @ApiProperty({ example: '8712bcc6-fe58-4395-870e-b2a854ca0b43' })
  @IsUUID()
  person_id: string;

  @ApiProperty({ example: '35abeabf-386e-430a-af3b-dc7918b81cc8' })
  @IsUUID()
  related_person_id: string;
}
