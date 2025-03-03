import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Credentials } from 'src/credentials/credentials.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
  ) {}

  async createUser(data: CreateUserDto) {
    const mailExist = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (mailExist) {
      throw new ConflictException('El email ya se encuentra registrado');
    }

    const userNameExist = await this.credentialsRepository.findOne({
      where: { userName: data.username },
    });

    if (userNameExist) {
      throw new ConflictException('El Nombre de usuario ya existe');
    }

    const hashPsw = await bcrypt.hash(data.password, 10);

    const newUser = this.userRepository.create(data);
    await this.userRepository.save(newUser);

    const credentials = this.credentialsRepository.create({
      userName: data.username,
      password: hashPsw,
      user: newUser,
    });

    await this.credentialsRepository.save(credentials);

    return { message: 'Usuario creado con exito', newUser };
  }
}
