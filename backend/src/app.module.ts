import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/db.config';
import { PersonsModule } from './persons/persons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    PersonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
