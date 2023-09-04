import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonEntity } from '../entities';
import { UpdatePersonDto } from './dto/update-person.dto';

describe('PersonsController', () => {
  let controller: PersonsController;
  let fakePersonsService: Partial<PersonsService>;

  const createPersonDto: CreatePersonDto = {
    first_name: 'John',
    last_name: 'Doe',
    description: 'A person',
    date_of_birth: new Date(),
    gender: 'M',
    email: 'test@test.com',
    mobile_number: '1234567890',
  };

  const updatePersonDto: UpdatePersonDto = {
    first_name: 'John2',
    last_name: 'Doe2',
  };
  const createdPerson: PersonEntity = {
    person_id: expect.any(String),
    ...createPersonDto,
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
    relationships: [],
    related_relationships: [],
  };

  const notFoundException = new NotFoundException('Person not found');
  const conflictException = new NotFoundException('Person already exists');

  beforeEach(async () => {
    fakePersonsService = {
      create: () => Promise.resolve(createdPerson),
      findPersons: () => Promise.resolve([createdPerson]),
      findPerson: () => Promise.resolve(createdPerson),
      update: () => Promise.resolve({ ...createdPerson, ...updatePersonDto }),
      remove: () => Promise.resolve(createdPerson),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [
        {
          provide: PersonsService,
          useValue: fakePersonsService,
        },
      ],
    }).compile();

    controller = module.get<PersonsController>(PersonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when calling create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    describe('and the person already exists', () => {
      beforeEach(() => {
        fakePersonsService.create = () => Promise.reject(conflictException);
      });

      it('should throw a conflict exception', () => {
        expect(controller.create(createPersonDto)).rejects.toThrow(
          conflictException,
        );
      });
    });

    describe('and the person does not exist', () => {
      it('should return a created person', () => {
        expect(controller.create(createPersonDto)).resolves.toMatchObject(
          createdPerson,
        );
      });
    });
  });

  describe('when calling findPersons', () => {
    it('should be defined', () => {
      expect(controller.findPersons).toBeDefined();
    });

    it('should return persons', () => {
      expect(controller.findPersons()).resolves.toMatchObject([createdPerson]);
    });
  });

  describe('when calling findPerson', () => {
    it('should be defined', () => {
      expect(controller.findPerson).toBeDefined();
    });

    describe('and the person does not exist', () => {
      beforeEach(() => {
        fakePersonsService.findPerson = () => Promise.reject(notFoundException);
      });

      it('should throw a not found exception', () => {
        expect(controller.findPerson('uuid')).rejects.toThrow(
          notFoundException,
        );
      });
    });

    describe('and the person exists', () => {
      it('should return a person', () => {
        expect(controller.findPerson('uuid')).resolves.toMatchObject(
          createdPerson,
        );
      });
    });
  });

  describe('when calling update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    describe('and the person does not exist', () => {
      beforeEach(() => {
        fakePersonsService.update = () => Promise.reject(notFoundException);
      });

      it('should throw a not found exception', () => {
        expect(controller.update('uuid', updatePersonDto)).rejects.toThrow(
          notFoundException,
        );
      });
    });

    describe('and the person exists', () => {
      it('should return a updated person', () => {
        expect(
          controller.update('uuid', updatePersonDto),
        ).resolves.toMatchObject({
          ...createdPerson,
          ...updatePersonDto,
        });
      });
    });
  });

  describe('when calling remove', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    describe('and the person does not exist', () => {
      beforeEach(() => {
        fakePersonsService.remove = () => Promise.reject(notFoundException);
      });

      it('should throw a not found exception', () => {
        expect(controller.remove('uuid')).rejects.toThrow(notFoundException);
      });
    });

    describe('and the person exists', () => {
      it('should return a deleted person', () => {
        expect(controller.remove('uuid')).resolves.toMatchObject(createdPerson);
      });
    });
  });
});
