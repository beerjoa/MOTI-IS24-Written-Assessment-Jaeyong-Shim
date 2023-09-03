import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonEntity } from './entities/person.entity';

describe('PersonsService', () => {
  let service: PersonsService;
  const createPersonDto: CreatePersonDto = {
    first_name: 'John',
    last_name: 'Doe',
    description: 'A person',
    date_of_birth: new Date(),
    gender: 'M',
    email: 'test@test.com',
    mobile_number: '1234567890',
  };
  const createdPerson: PersonEntity = {
    person_id: expect.any(String),
    ...createPersonDto,
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
  };
  const updatePersonDto: UpdatePersonDto = {
    first_name: 'Dohn',
    last_name: 'Joe',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonsService,
        {
          provide: getRepositoryToken(PersonEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(createdPerson),
            save: jest.fn().mockReturnValue(createdPerson),
            find: jest.fn().mockResolvedValue([createdPerson]),
            findOne: jest.fn().mockResolvedValue(createdPerson),
            update: jest.fn().mockResolvedValue(true),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when calling create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    describe('and the person already exists', () => {
      beforeEach(() => {
        jest
          .spyOn(service, 'findDuplicatedPerson')
          .mockResolvedValue(createdPerson);
      });
      it('should throw an error', () => {
        expect(service.create(createPersonDto)).rejects.toThrow(
          ConflictException,
        );
      });
    });

    describe('and the person does not exist', () => {
      beforeEach(() => {
        jest.spyOn(service, 'findDuplicatedPerson').mockResolvedValue(null);
      });
      it('should return a created person', () => {
        expect(service.create(createPersonDto)).resolves.toMatchObject({
          person_id: expect.any(String),
          ...createPersonDto,
        });
      });
    });
  });

  describe('when calling findPersons', () => {
    it('should be defined', () => {
      expect(service.findPersons).toBeDefined();
    });

    it('should return an array of persons', () => {
      expect(service.findPersons()).resolves.toMatchObject([createdPerson]);
    });
  });

  describe('when calling findPerson', () => {
    it('should be defined', () => {
      expect(service.findPerson).toBeDefined();
    });

    describe('and the person is not found', () => {
      beforeEach(() => {
        jest
          .spyOn(service, 'findPerson')
          .mockRejectedValue(new NotFoundException('Person not found'));
      });

      it('should throw an error', () => {
        expect(service.findPerson('uuid')).rejects.toThrow(NotFoundException);
      });
    });

    describe('and the person is found', () => {
      it('should return a person', () => {
        expect(service.findPerson('uuid')).resolves.toMatchObject(
          createdPerson,
        );
      });
    });
  });

  describe('when calling update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    describe('and the person is not found', () => {
      beforeEach(() => {
        jest
          .spyOn(service, 'findPerson')
          .mockRejectedValue(new NotFoundException('Person not found'));
      });

      it('should throw an error', () => {
        expect(service.update('uuid', updatePersonDto)).rejects.toThrow(
          NotFoundException,
        );
      });
    });

    describe('and the person is found', () => {
      const updatedPerson: PersonEntity = {
        person_id: 'uuid',
        ...createPersonDto,
        ...updatePersonDto,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      };

      beforeEach(() => {
        jest.spyOn(service, 'update').mockResolvedValue(updatedPerson);
      });
      it('should return a updated person', () => {
        expect(service.update('uuid', updatePersonDto)).resolves.toMatchObject(
          updatedPerson,
        );
      });
    });
  });

  describe('when calling remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    describe('and the person is not found', () => {
      beforeEach(() => {
        jest
          .spyOn(service, 'findPerson')
          .mockRejectedValue(new NotFoundException('Person not found'));
      });

      it('should throw an error', () => {
        expect(service.remove('uuid')).rejects.toThrow(NotFoundException);
      });
    });
    describe('and the person is found', () => {
      it('should return a person', () => {
        expect(service.remove('uuid')).resolves.toMatchObject(createdPerson);
      });
    });
  });
});
