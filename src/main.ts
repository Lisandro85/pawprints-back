import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGblobal } from './middleware/logger';

const PORT = 3002;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(loggerGblobal);
    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    });
    await app.listen(PORT);
    console.log(`Server listen on port: ${PORT} 🚀`);
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
