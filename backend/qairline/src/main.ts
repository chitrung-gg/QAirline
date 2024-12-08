import { LazyModuleLoader, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {abortOnError: true, cors: true});
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );

  const lazyModuleLoader = app.get(LazyModuleLoader);
  
  // Lazy loading
  const { AircraftModule } = await import("./aircraft/aircraft.module")
  await lazyModuleLoader.load(() => AircraftModule)

  const { AirportModule } = await import("./airport/airport.module")
  await lazyModuleLoader.load(() => AirportModule)
  
  const { PaymentModule } = await import("./payment/payment.module")
  await lazyModuleLoader.load(() => PaymentModule)
  
  const { VerificationModule } = await import("./verification/verification.module")
  await lazyModuleLoader.load(() => VerificationModule)
  
  const { EmailModule } = await import("./email/email.module")
  await lazyModuleLoader.load(() => EmailModule)
  

  const config = new DocumentBuilder()
    .setTitle('QAirline System')
    .setDescription('System API hierarchy description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(compression())


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
