import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsDate()
  birthDate: Date;

  @IsBoolean()
  isActive: boolean;
}
