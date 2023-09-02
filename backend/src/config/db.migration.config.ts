import { DataSource } from 'typeorm';

export const databaseMigrationConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // db container host
  port: parseInt(process.env.DATABASE_HOST) || 45432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'postgres',
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrations: [`src/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations_typeorm',
});
