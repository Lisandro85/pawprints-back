import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Cloudinary } from 'src/cloudinary/cloudinary.entity';
import { Credentials } from 'src/credentials/credentials.entity';
import { Users } from 'src/users/entities/user.entity';

dotenv.config();

export const AppDataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_LOCALHOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  synchronize: true,
  logging: false,
  dropSchema: false,
  entities: [Users, Credentials, Cloudinary],
  subscribers: [],
  migrations: [],
};
