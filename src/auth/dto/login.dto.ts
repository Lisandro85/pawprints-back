import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Credentials } from 'src/credentials/credentials.entity';

export class LoginDto extends Credentials {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
