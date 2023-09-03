import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonEntity } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(PersonEntity)
    private personRepository: Repository<PersonEntity>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    const duplicatedPerson = await this.findDuplicatedPerson(createPersonDto);

    if (duplicatedPerson !== null) {
      throw new ConflictException('Person already exists');
    }

    const person = this.personRepository.create(createPersonDto);

    return this.personRepository.save(person);
  }

  async findPersons(): Promise<PersonEntity[]> {
    const persons = await this.personRepository.find();

    return persons;
  }

  async findPerson(person_id: string): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({
      where: { person_id },
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return person;
  }

  async findDuplicatedPerson(
    updatedPersonDto: UpdatePersonDto,
  ): Promise<PersonEntity> {
    const { first_name, last_name, date_of_birth } = updatedPersonDto;
    const duplicatedPerson = await this.personRepository.findOne({
      where: { first_name, last_name, date_of_birth },
    });

    return duplicatedPerson;
  }
  async update(
    person_id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<PersonEntity> {
    const person = await this.findPerson(person_id);

    Object.assign(person, updatePersonDto);
    return await this.personRepository.save(person);
  }

  async remove(person_id: string): Promise<PersonEntity> {
    const person = await this.findPerson(person_id);

    await this.personRepository.remove(person);
    return person;
  }
}
