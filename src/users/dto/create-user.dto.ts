import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email: string;

  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'La fecha de nacimiento no es válida' })
  birthDate: Date;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
