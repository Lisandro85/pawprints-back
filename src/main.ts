import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT);
    console.log(`Server listen on port: ${PORT} 🚀`);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
