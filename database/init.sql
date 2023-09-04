CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE PERSONS TABLE
DROP TABLE IF EXISTS "persons";
CREATE TABLE "persons" (
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

-- CREATE RELATIONSHIPS TABLE

DROP TABLE IF EXISTS "relationships";
CREATE TABLE "relationships" (
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