import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { RelationshipEntity } from './Relationships';

export type TGender = 'M' | 'F' | 'U';

@Entity('persons')
export class PersonEntity {
  @ApiProperty({
    description: 'The unique identifier of the person',
    example: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
  })
  @PrimaryGeneratedColumn('uuid')
  person_id: string;

  @ApiProperty({
    description: 'The first name of the person',
    example: 'John',
  })
  @Column({ length: 255 })
  first_name: string;

  @ApiProperty({
    description: 'The last name of the person',
    example: 'Doe',
  })
  @Column({ length: 255 })
  last_name: string;

  @ApiProperty({
    description: 'The description of the person',
    example: 'John Doe is a person',
  })
  @Column({ length: 500 })
  description: string;

  @ApiProperty({
    description: 'The date of birth of the person',
    example: '1990-01-01',
  })
  @Column()
  date_of_birth: Date;

  @ApiProperty({
    description: 'The gender of the person',
    example: 'M',
  })
  @Column({ length: 1 })
  gender: TGender;

  @ApiProperty({
    description: 'The email of the person',
    example: 'test@test.com',
  })
  @Column({ length: 255 })
  email: string;

  @ApiProperty({
    description: 'The mobile number of the person',
    example: '+1 (777) 777-7777',
  })
  @Column({ length: 255 })
  mobile_number: string;

  @ApiProperty({
    description: 'The date the person was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    description: 'The date the person was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => RelationshipEntity, (relationship) => relationship.person)
  relationships: RelationshipEntity[];

  @OneToMany(
    () => RelationshipEntity,
    (relationship) => relationship.relatedPerson,
  )
  related_relationships: RelationshipEntity[];

  constructor(partial: Partial<PersonEntity>) {
    Object.assign(this, partial);
  }
}

export class PersonRelationshipEntity extends PersonEntity {
  @ApiProperty({
    description: 'The relationships of the person',
    example: [
      {
        relationship_id: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
        relationship_type: 'parent',
        person_id: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
        related_person_id: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: '2021-01-01T00:00:00.000Z',
      },
    ],
  })
  relationships: RelationshipEntity[];

  @ApiProperty({
    description: 'The related relationships of the person',
    example: [
      {
        relationship_id: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
        relationship_type: 'parent',
        person_id: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
        related_person_id: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: '2021-01-01T00:00:00.000Z',
      },
    ],
  })
  related_relationships: RelationshipEntity[];
}
