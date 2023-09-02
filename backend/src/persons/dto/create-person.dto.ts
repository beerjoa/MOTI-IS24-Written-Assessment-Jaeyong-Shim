import { IsString, IsDate, IsPhoneNumber } from 'class-validator';
import { TGender } from '../entities/person.entity';

export class CreatePersonDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  description: string;

  @IsDate()
  date_of_birth: Date;

  @IsString()
  gender: TGender;

  @IsString()
  email: string;

  @IsPhoneNumber()
  mobile_number: string;
}
