import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from 'src/credentials/credentials.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Credentials)
    private readonly credentialRepository: Repository<Credentials>,
    private jwtService: JwtService,
  ) {}

  //VALIDACION DEL USUARIO EN BASE DE DATOS
  async login(userName: string, password: string) {
    try {
      const userExist = await this.credentialRepository.findOne({
        where: { userName: userName },
      });

      if (!userExist) {
        throw new UnauthorizedException('Credenciales no validas');
      }

      const validPsw = await bcrypt.compare(password, userExist.password);

      if (!validPsw) {
        throw new UnauthorizedException('Credenciales no validas');
      }

      const payload = {
        sub: userExist.id,
        username: userExist.userName,
        role: userExist.role,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }
}
