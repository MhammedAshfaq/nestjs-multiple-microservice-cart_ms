import { Observable } from 'rxjs';

type CreateProductRes = {
  name: string;
  description: string;
  price: number;
  photo: string;
};

type SearchProduct = {
  id: string;
};

export interface ProductMicroService {
  createProduct(request: CreateProductRes): Observable<any>;
  searchProductWithId(request: SearchProduct): Observable<any>;
}
