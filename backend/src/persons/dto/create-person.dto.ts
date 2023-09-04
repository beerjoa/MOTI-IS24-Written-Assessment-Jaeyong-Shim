import { IsString, IsPhoneNumber, IsDateString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TGender } from '../../entities/Persons';

const genders: TGender[] = ['M', 'F', 'U'];
export class CreatePersonDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'John Doe is a person' })
  @IsString()
  description: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsDateString()
  date_of_birth: Date;

  @ApiProperty({ example: 'M' })
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  @IsIn(genders)
  gender: TGender;

  @ApiProperty({ example: 'test@test.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '+1 (777) 777-7777' })
  @IsPhoneNumber()
  mobile_number: string;
}
