import { AxiosInstance } from 'axios';
import { PRODUCT } from '@/constants/urls';
import { Product } from '@/types/domain/Product';
import { GetProductsResponse } from '@/types/dto/GetProductsResponse';

export const product = (http: AxiosInstance) => ({
  getProducts: async (): Promise<Product[]> => {
    const response = await http.get<GetProductsResponse>(PRODUCT.GET_ALL);
    return response.data.map(
      ({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
      }): Product => ({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
      })
    );
  },
});
