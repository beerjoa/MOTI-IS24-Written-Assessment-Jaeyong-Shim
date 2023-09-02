import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

describe('PersonsService', () => {
  let service: PersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonsService],
    }).compile();

    service = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

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

  describe('when calling create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should return a string', () => {
      expect(service.create(createPersonDto)).toEqual(
        'This action adds a new person',
      );
    });
  });

  describe('when calling update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should return a string', () => {
      expect(service.update(1, updatePersonDto)).toEqual(
        'This action updates a #1 person',
      );
    });
  });
});
