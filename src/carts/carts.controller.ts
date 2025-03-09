import { Controller } from '@nestjs/common';
import { CartsService } from './carts.service';
import { GrpcMethod } from '@nestjs/microservices';
import { addToCartReq } from 'src/helpers/interface/cart.interface';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @GrpcMethod('CartService', 'addToCart')
  async addToCart(data: addToCartReq) {
    return await this.cartsService.addToCart(data);
  }
}
