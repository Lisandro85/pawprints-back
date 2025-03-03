import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;
  @IsDate()
  birthDate: Date;
  @IsBoolean()
  isActive: boolean;
}
