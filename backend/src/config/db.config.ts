import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { PersonEntity, RelationshipEntity } from '../entities';
import { CreatePersonTable1693679459799 } from '../migrations/1693679459799-create-persons-table';
import { CreateRelationshipsTable1693681623730 } from '../migrations/1693681623730-create-relationships-table';

export default class DBConfig {
  static getDBConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DATABASE_HOST') || 'db', // db container host
      port: configService.get('DATABASE_PORT') || 5432,
      username: configService.get('DATABASE_USER') || 'postgres',
      password: configService.get('DATABASE_PASSWORD') || 'postgres',
      database: configService.get('DATABASE_NAME') || 'postgres',
      entities: [PersonEntity, RelationshipEntity],
      synchronize: process.env.NODE_ENV === 'development',
      migrations: [
        CreatePersonTable1693679459799,
        CreateRelationshipsTable1693681623730,
      ],
      migrationsTableName: 'migrations_typeorm',
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => DBConfig.getDBConfig(configService),
  inject: [ConfigService],
};
