import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationshipsService } from './relationships.service';
import { RelationshipsController } from './relationships.controller';
import { RelationshipEntity } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([RelationshipEntity])],
  controllers: [RelationshipsController],
  providers: [RelationshipsService],
})
export class RelationshipsModule {}
