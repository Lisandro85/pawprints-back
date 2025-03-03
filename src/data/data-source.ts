import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Users } from 'src/entities/users.entity';

dotenv.config();

export const AppDataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_LOCALHOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  synchronize: true,
  logging: true,
  entities: [Users],
  subscribers: [],
  migrations: [],
};
