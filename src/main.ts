import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

const microServiceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'carts',
    url: process.env.CARTS_URL,
    protoPath: join(process.cwd(), 'src/helpers/proto/cart.proto'),
  },
};
async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microServiceOptions,
  );

  app.listen();
  console.log('Cart Micro service is nunning');
}
bootstrap();
