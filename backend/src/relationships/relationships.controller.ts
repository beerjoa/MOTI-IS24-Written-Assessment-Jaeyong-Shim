import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';

import { RelationshipsService } from './relationships.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RelationshipEntity } from '../entities';

@ApiTags('relationships')
@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @ApiOkResponse({ type: RelationshipEntity, description: 'success' })
  @ApiOperation({ summary: 'Create a relationship' })
  @Post()
  create(@Body() createRelationshipDto: CreateRelationshipDto) {
    return this.relationshipsService.create(createRelationshipDto);
  }

  @ApiOkResponse({ type: RelationshipEntity, description: 'success' })
  @ApiOperation({ summary: 'Find a relationship' })
  @ApiParam({ name: 'relationship_id', type: String })
  @Get(':relationship_id')
  findOne(@Param('relationship_id', ParseUUIDPipe) relationship_id: string) {
    return this.relationshipsService.findOne(relationship_id);
  }

  @ApiOkResponse({ type: RelationshipEntity, description: 'success' })
  @ApiOperation({ summary: 'Update a relationship' })
  @ApiParam({ name: 'relationship_id', type: String })
  @Put(':relationship_id')
  update(
    @Param('relationship_id') relationship_id: string,
    @Body() updateRelationshipDto: UpdateRelationshipDto,
  ) {
    return this.relationshipsService.update(
      relationship_id,
      updateRelationshipDto,
    );
  }

  @ApiOkResponse({ type: RelationshipEntity, description: 'success' })
  @ApiOperation({ summary: 'Remove a relationship' })
  @ApiParam({ name: 'relationship_id', type: String })
  @Delete(':relationship_id')
  remove(@Param('relationship_id') relationship_id: string) {
    return this.relationshipsService.remove(relationship_id);
  }
}
