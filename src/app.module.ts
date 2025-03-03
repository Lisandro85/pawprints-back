import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data/data-source';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
