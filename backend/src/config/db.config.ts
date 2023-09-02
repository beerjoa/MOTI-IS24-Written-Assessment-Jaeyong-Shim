// import { registerAs } from '@nestjs/config';

import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class DBConfig {
  static getDBConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DATABASE_HOST') || 'db', // db container host
      port: configService.get('DATABASE_PORT') || 5432,
      username: configService.get('DATABASE_USER') || 'postgres',
      password: configService.get('DATABASE_PASSWORD') || 'postgres',
      database: configService.get('DATABASE_NAME') || 'postgres',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: process.env.NODE_ENV === 'development',
      migrations: [`${__dirname}/**/migrations/*{.ts,.js}`],
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
