import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { PersonEntity } from './Persons';

export type TRelationshipType =
  | 'parent'
  | 'child'
  | 'sibling'
  | 'spouse'
  | 'friend';

@Entity('relationships')
export class RelationshipEntity {
  @ApiProperty({
    description: 'The unique identifier of the relationship',
    example: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
  })
  @PrimaryGeneratedColumn('uuid')
  relationship_id: string;

  @ApiProperty({
    description: 'The type of the relationship',
    example: 'parent',
  })
  @Column({ length: 255 })
  relationship_type: TRelationshipType;

  @ApiProperty({
    description: 'The unique identifier of the person',
    example: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
  })
  @Column('uuid')
  person_id: string;

  @ApiProperty({
    description: 'The unique identifier of the related person',
    example: '8712bcc6-fe58-4395-870e-b2a854ca0b43',
  })
  @Column('uuid')
  related_person_id: string;

  @ApiProperty({
    description: 'The date the relationship was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    description: 'The date the relationship was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => PersonEntity, (person) => person.relationships, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'person_id' })
  person: PersonEntity;

  @ManyToOne(() => PersonEntity, (person) => person.related_relationships, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'related_person_id' })
  relatedPerson: PersonEntity;

  constructor(partial: Partial<RelationshipEntity>) {
    Object.assign(this, partial);
  }
}
