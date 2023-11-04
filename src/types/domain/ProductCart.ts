import { Product } from '@/types/domain/Product';

export type ProductCart = Product & {
  quantity: number;
};
