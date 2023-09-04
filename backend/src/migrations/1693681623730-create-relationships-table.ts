import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationshipsTable1693681623730
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE relationships (
        relationship_id uuid DEFAULT uuid_generate_v4(),
        relationship_type varchar(255) NOT NULL,
        person_id uuid NOT NULL,
        related_person_id uuid NOT NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        PRIMARY KEY (relationship_id),
        CONSTRAINT FKPerson FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT FKRelatedPerson FOREIGN KEY (related_person_id) REFERENCES persons(person_id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('relationships');
  }
}
