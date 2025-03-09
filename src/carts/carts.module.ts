import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from 'src/helpers/entity/carts.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Carts]),
    ClientsModule.register([
      {
        name: 'products',
        transport: Transport.GRPC,
        options: {
          url: process.env.PRODUCTS_URL,
          package: 'products',
          protoPath: join(process.cwd(), 'src/helpers/proto/product.proto'),
        },
      },
    ]),
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
