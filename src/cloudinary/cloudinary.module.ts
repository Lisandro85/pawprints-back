import { Module } from '@nestjs/common';
import { UploadController } from './cludinary.controller';
import { UploadService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';
import { UserRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cloudinary } from './cloudinary.entity';
import { Users } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Credentials } from 'src/credentials/credentials.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cloudinary, Users, Credentials]),
    AuthModule,
  ],
  controllers: [UploadController],
  providers: [CloudinaryProvider, UploadService, UserRepository],
  exports: [CloudinaryProvider, UploadService],
})
export class CloudinaryModule {}
