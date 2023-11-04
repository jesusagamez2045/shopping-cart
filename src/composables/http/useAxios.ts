import axios from 'axios';

const useAxios = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const instance = axios.create({
    baseURL: API_URL,
  });

  return instance;
};

export default useAxios;
