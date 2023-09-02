import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type TGender = 'M' | 'F' | 'U';

@Entity('persons')
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid')
  person_id: string;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column({ length: 500 })
  description: string;

  @Column()
  date_of_birth: Date;

  @Column({ length: 1 })
  gender: TGender;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  mobile_number: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  constructor(partial: Partial<PersonEntity>) {
    Object.assign(this, partial);
  }
}
