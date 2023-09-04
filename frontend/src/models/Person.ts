import { Entity } from './index';

export type TPersonGender = 'M' | 'F' | 'U';

export type TPerson = Entity & {
  person_id: string;
  first_name: string;
  last_name: string;
  description: string;
  date_of_birth: string;
  gender: TPersonGender;
  email: string;
  mobile_number: string;
};

export const dummyPerson: TPerson = {
  person_id: 'ab3c19be-7ea0-451a-98a8-4ce1415882b0',
  first_name: 'John',
  last_name: 'Doe',
  description: 'A person',
  date_of_birth: '2023-09-02 20:44:19.818Z',
  gender: 'M',
  email: 'test@test.com',
  mobile_number: '+1 (234) 567-8901',
  created_at: '2023-09-02 20:44:19.818Z',
  updated_at: '2023-09-02 20:44:19.818Z',
};

export const dummyPersons: TPerson[] = [dummyPerson];
