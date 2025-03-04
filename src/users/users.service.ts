import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  //CREAR UN NUEVO USUARIO
  createUser(data: CreateUserDto) {
    return this.userRepository.createUser(data);
  }

  //OBTENER TODOS LOS USUARIOS
  getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  //OBTENER USUARIO POR ID//
  getUserById(id: Users['id']) {
    return this.userRepository.getUserById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
