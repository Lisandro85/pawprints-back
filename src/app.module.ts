import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-config/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource),
    UsersModule,
    AuthModule,
    AuthModule,
    CloudinaryModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
