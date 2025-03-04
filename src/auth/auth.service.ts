import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from 'src/credentials/credentials.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Credentials)
    private readonly credentialRepository: Repository<Credentials>,
  ) {}

  async login(userName: string, password: string) {
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

    return { message: 'Login Exitoso' };
  }
}
