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

import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonEntity, PersonRelationshipEntity } from '../entities';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @ApiOkResponse({ type: PersonEntity, description: 'success' })
  @ApiOperation({ summary: 'Create a person' })
  @Post()
  create(@Body() createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    return this.personsService.create(createPersonDto);
  }

  @ApiOkResponse({ type: [PersonEntity], description: 'success' })
  @ApiOperation({ summary: 'Find all persons' })
  @Get()
  findPersons(): Promise<PersonEntity[]> {
    return this.personsService.findPersons();
  }

  @ApiOkResponse({ type: PersonEntity, description: 'success' })
  @ApiOperation({ summary: 'Find a person' })
  @ApiParam({ name: 'person_id', type: String })
  @Get(':person_id')
  findPerson(
    @Param('person_id', ParseUUIDPipe) person_id: string,
  ): Promise<PersonEntity> {
    return this.personsService.findPerson(person_id);
  }

  @ApiOkResponse({ type: PersonRelationshipEntity, description: 'success' })
  @ApiOperation({ summary: 'Find a person relationships' })
  @ApiParam({ name: 'person_id', type: String })
  @Get(':person_id/relationships')
  findPersonRelationships(
    @Param('person_id', ParseUUIDPipe) person_id: string,
  ): Promise<PersonRelationshipEntity> {
    return this.personsService.findPersonRelationships(person_id);
  }

  @ApiOkResponse({ type: PersonEntity, description: 'success' })
  @ApiOperation({ summary: 'Update a person' })
  @ApiParam({ name: 'person_id', type: String })
  @Put(':person_id')
  update(
    @Param('person_id', ParseUUIDPipe) person_id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<PersonEntity> {
    return this.personsService.update(person_id, updatePersonDto);
  }

  @ApiOkResponse({ type: PersonEntity, description: 'success' })
  @ApiOperation({ summary: 'Remove a person' })
  @ApiParam({ name: 'person_id', type: String })
  @Delete(':person_id')
  remove(
    @Param('person_id', ParseUUIDPipe) person_id: string,
  ): Promise<PersonEntity> {
    return this.personsService.remove(person_id);
  }
}
