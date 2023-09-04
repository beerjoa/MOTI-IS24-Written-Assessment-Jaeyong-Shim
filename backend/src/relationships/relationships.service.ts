import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { RelationshipEntity } from '../entities';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(RelationshipEntity)
    private relationshipRepository: Repository<RelationshipEntity>,
  ) {}
  async create(createRelationshipDto: CreateRelationshipDto) {
    await this.validateCreatableRelationship(createRelationshipDto);

    const relationship = this.relationshipRepository.create(
      createRelationshipDto,
    );

    return await this.relationshipRepository.save(relationship);
  }

  async validateCreatableRelationship(
    createRelationshipDto: CreateRelationshipDto,
  ) {
    const { person_id, related_person_id, relationship_type } =
      createRelationshipDto;

    const relationships = await this.relationshipRepository.find({
      where: [
        { person_id, related_person_id },
        { person_id: related_person_id, related_person_id: person_id },
      ],
    });

    if (Array.isArray(relationships) && relationships.length > 0) {
      throw new ConflictException('Relationship already exists');
    }

    if (relationship_type === 'parent' || relationship_type === 'child') {
      const parentRelationships = await this.relationshipRepository.find({
        where: [
          { person_id, relationship_type: 'parent' },
          { related_person_id: person_id, relationship_type: 'child' },
        ],
      });

      if (
        Array.isArray(parentRelationships) &&
        parentRelationships.length >= 2
      ) {
        throw new ConflictException(
          `Person already have ${parentRelationships.length} parents`,
        );
      }
    }

    return relationships;
  }

  findOne(relationship_id: string) {
    const relationship = this.relationshipRepository.findOne({
      where: { relationship_id },
    });

    return relationship;
  }

  async update(
    relationship_id: string,
    updateRelationshipDto: UpdateRelationshipDto,
  ) {
    const relationship = await this.findOne(relationship_id);

    Object.assign(relationship, updateRelationshipDto);
    return await this.relationshipRepository.save(relationship);
  }

  async remove(relationship_id: string) {
    const relationship = await this.findOne(relationship_id);

    await this.relationshipRepository.remove(relationship);
    return relationship;
  }
}
