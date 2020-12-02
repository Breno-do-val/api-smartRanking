import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // it resolves in an Express application
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
}
bootstrap();
