import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'El nombre no debe contener números ni espacios.',
  })
  name: string;

  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message: 'El apellido no debe contener números ni espacios.',
  })
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
  @MinLength(8, { message: 'Minimo 8 caracteres' })
  @MaxLength(20, {
    message: 'Menor a 20 caracteres',
  })
  @Matches(/[A-Z]/, {
    message: 'Al menos una letra mayúscula',
  })
  @Matches(/\d/, {
    message: 'Al menos un número',
  })
  @Matches(/[@$!%*?&]/, {
    message: 'Al menos un carácter especial (@$!%*?&)',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
