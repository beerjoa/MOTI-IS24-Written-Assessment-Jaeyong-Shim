import { IsString, IsPhoneNumber, IsDateString } from 'class-validator';

import { TGender } from '../entities/person.entity';

export class CreatePersonDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  description: string;

  @IsDateString()
  date_of_birth: Date;

  @IsString()
  gender: TGender;

  @IsString()
  email: string;

  @IsPhoneNumber()
  mobile_number: string;
}
