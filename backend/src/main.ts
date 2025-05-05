import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Habilitar CORS para todas las rutas y orígenes

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si se envían propiedades no definidas
      transform: true, // Transforma el payload a instancias del DTO
      transformOptions: {
        enableImplicitConversion: true, // Permite conversión implícita de tipos (ej. string a number en query params)
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Bolsa de Trabajo API')
    .setDescription('API para la bolsa de trabajo')
    .setVersion('1.0')
    .addTag('Authentication', 'Endpoints related to user authentication') 
    .addTag('Users', 'Endpoints related to user management') 
    .addTag('Companies', "Endpoints related to company management")
    .addTag('Job Offers', 'Endpoints related to job management')
    .addBearerAuth(
      {
        description: `Por favor ingresa el token JWT en este formato: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'JWT', 
        scheme: 'bearer',
        type: 'http', 
        in: 'Header', 
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api-docs', app, document); 

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

