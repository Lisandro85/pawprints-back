import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const userExist = await this.credentialRepository.findOne({
      where: { userName: userName },
      relations: ['user'],
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
    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      id: userExist.user.id,
      name: userExist.user.name,
      email: userExist.user.email,
      role: userExist.role,
    };
  }
}
