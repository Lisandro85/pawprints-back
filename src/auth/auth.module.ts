import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from 'src/credentials/credentials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credentials])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
