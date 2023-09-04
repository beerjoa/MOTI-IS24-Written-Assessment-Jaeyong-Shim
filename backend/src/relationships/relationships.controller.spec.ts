import { Test, TestingModule } from '@nestjs/testing';

import { RelationshipsController } from './relationships.controller';
import { RelationshipsService } from './relationships.service';
import { RelationshipEntity } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('RelationshipsController', () => {
  let controller: RelationshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationshipsController],
      providers: [
        RelationshipsService,
        {
          provide: getRepositoryToken(RelationshipEntity),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue(true),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<RelationshipsController>(RelationshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
