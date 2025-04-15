import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('cats') // Optional: add a tag to group endpoints
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document); // This serves the Swagger UI at /api

  const port = config.get<number>('port') || 3000;
  console.log(`🚀 Booting app on port: ${port}`);
  await app.listen(port, '0.0.0.0');
  console.log(`✅ App is listening on port ${port}`);

}
bootstrap();
