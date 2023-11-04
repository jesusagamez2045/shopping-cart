import { AxiosInstance } from 'axios';
import { CATEGORY } from '@/constants/urls';
import { GetCategoriesResponse } from '@/types/dto/GetCategoriesResponse';

export const category = (http: AxiosInstance) => ({
  getCategories: async (): Promise<string[]> => {
    const response = await http.get<GetCategoriesResponse>(CATEGORY.GET_ALL);
    return response.data.map((category): string => category);
  },
});
