import useAxios from '@/composables/http/useAxios';
import { product } from '@/services/product';

const useProduct = () => {
  const axios = useAxios();

  return {
    ...product(axios),
  };
};

export default useProduct;
