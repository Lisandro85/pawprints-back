import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createUser(data: CreateUserDto) {
    const userexist = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (userexist) {
      throw new ConflictException('El email ya se encuentra registrado');
    }

    const newUser = this.userRepository.create(data);
    await this.userRepository.save(newUser);

    return { message: 'Usuario creado con exito', newUser };
  }
}
