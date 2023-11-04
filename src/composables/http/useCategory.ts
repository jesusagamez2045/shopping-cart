import useAxios from '@/composables/http/useAxios';
import { category } from '@/services/category';

const useCategory = () => {
  const axios = useAxios();

  return {
    ...category(axios),
  };
};

export default useCategory;
