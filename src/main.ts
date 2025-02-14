import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors( {origin: 'https://www.mercadopago.com', // O la URL de MercadoPago
    methods: 'GET, POST',
    allowedHeaders: 'Content-Type, Authorization',});

  const config = new DocumentBuilder()
    .setTitle('SistemagestionCem')
    .setDescription('Sistema para la gestion de reparacion de celulares')
    .setVersion('1.0')
    //.addTag('ecommerce')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Opcional pero recomendado
      },
      'JWT', // Nombre de la estrategia de autenticación
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
