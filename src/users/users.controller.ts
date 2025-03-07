import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/decorators/enum.role';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //CREAR UN NUEVO USUARIO//
  @Post('/register')
  @UsePipes(new ValidationPipe())
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  //OBTENER TODOS LOS USUARIOS//
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  //OBTENER USUARIO POR id
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Get(':id')
  getUserById(@Param('id') id: Users['id']) {
    return this.usersService.getUserById(id);
  }

  //BORRADO LOGICO DE UN USUARIO
  @Patch('/delete/:id')
  logicDeleteUser(@Param('id') id: Users['id']) {
    return this.usersService.logicDeleteUser(id);
  }
}
