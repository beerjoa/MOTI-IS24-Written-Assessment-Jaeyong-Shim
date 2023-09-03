import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonEntity } from './entities/person.entity';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
