import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource)],
  controllers: [],
  providers: [],
})
export class AppModule {}
