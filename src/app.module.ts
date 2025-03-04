import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-config/data-source';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource),
    UsersModule,
    AuthModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
