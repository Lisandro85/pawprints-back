import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //CREAR UN NUEVO USUARIO//
  @Post('/register')
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  //OBTENER TODOS LOS USUARIOS//
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  //OBTENER USUARIO POR id

  @Get(':id')
  getUserById(@Param('id') id: Users['id']) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
