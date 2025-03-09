import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'carts' })
export class Carts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'product_details', type: 'text' })
  productDetails: string;
}
