import { DataSource } from 'typeorm';

import { PersonEntity } from '../persons/entities/person.entity';
import { CreatePersonTable1693679459799 } from '../migrations/1693679459799-create-persons-table';
import { CreateRelationshipsTable1693681623730 } from '../migrations/1693681623730-create-relationships-table';

export const databaseMigrationConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // db container host
  port: parseInt(process.env.DATABASE_HOST) || 45432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'postgres',
  entities: [PersonEntity],
  synchronize: false,
  migrations: [
    CreatePersonTable1693679459799,
    CreateRelationshipsTable1693681623730,
  ],
  migrationsTableName: 'migrations_typeorm',
});
