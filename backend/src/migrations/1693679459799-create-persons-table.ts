import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePersonTable1693679459799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // this is needed to generate uuids
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`
      CREATE TABLE persons (
        person_id uuid DEFAULT uuid_generate_v4(),
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        description varchar(500) NOT NULL,
        date_of_birth date NOT NULL,
        gender varchar(1) NOT NULL,
        email varchar(255) NOT NULL,
        mobile_number varchar(255) NOT NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        PRIMARY KEY (person_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('persons');
  }
}
