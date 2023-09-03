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
import { PersonEntity } from './entities/person.entity';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  findPersons(): Promise<PersonEntity[]> {
    return this.personsService.findPersons();
  }

  @Get(':uuid')
  findPerson(
    @Param('uuid', ParseUUIDPipe) person_id: string,
  ): Promise<PersonEntity> {
    return this.personsService.findPerson(person_id);
  }

  @Put(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) person_id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<PersonEntity> {
    return this.personsService.update(person_id, updatePersonDto);
  }

  @Delete(':uuid')
  remove(
    @Param('uuid', ParseUUIDPipe) person_id: string,
  ): Promise<PersonEntity> {
    return this.personsService.remove(person_id);
  }
}
