import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Carts } from 'src/helpers/entity/carts.entity';
import { addToCartReq } from 'src/helpers/interface/cart.interface';
import { ProductMicroService } from 'src/helpers/interface/product.interface';
// import { ProductMicroService } from 'src/helpers/interface/product.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CartsService implements OnModuleInit {
  private productService: ProductMicroService;

  constructor(
    @Inject('products')
    private productClient: ClientGrpc,
    @InjectRepository(Carts)
    private readonly cartsRepository: Repository<Carts>,
  ) {}
  onModuleInit() {
    this.productService =
      this.productClient.getService<ProductMicroService>('ProductService');
  }

  async addToCart(data: addToCartReq) {
    console.log('_____', data);
    try {
      const findProduct = await firstValueFrom(
        this.productService.searchProductWithId({ id: data.productId }),
      );
      console.log('====', findProduct);
      await this.cartsRepository.save({
        userId: data.userId,
        productId: data.productId,
        productDetails: JSON.stringify(findProduct),
      });
      return {
        success: true,
        message: 'Item added to cart',
      };
    } catch (error) {
      if (error.message == '2 UNKNOWN: Product not found') {
        return {
          success: false,
          message: 'Product not found',
          error: {
            code: '404',
            message: 'Product not found',
          },
        };
      }
      console.log(error.code); //error.code === 5
      console.log('_________EOORO', error.message);
    }
  }
}
