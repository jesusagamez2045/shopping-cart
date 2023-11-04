<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

import useProduct from '@/composables/http/useProduct';
import useCategory from '@/composables/http/useCategory';

import { useCartStore } from '@/store/cart';

import { Product } from '@/types/domain/Product';

import ProductList from '@/components/ProductList.vue';

const toast = useToast();
const { getProducts } = useProduct();
const { getCategories } = useCategory();

const cartStore = useCartStore();
const { addProductToCart } = cartStore;

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const isLoading = ref(false);

const getAllProducts = async () => {
  try {
    products.value = await getProducts();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ha ocurrido un error al cargar los productos',
      life: 3000,
    });
    throw error;
  }
};

const getAllCategories = async () => {
  try {
    categories.value = await getCategories();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Ha ocurrido un error al cargar las categorías',
      life: 3000,
    });
    throw error;
  }
};

const getAllData = async () => {
  isLoading.value = true;
  await Promise.allSettled([getAllProducts(), getAllCategories()]);
  isLoading.value = false;
};

const onClickAddToCardProduct = (product: Product) => {
  addProductToCart(product);
};

onMounted(() => {
  getAllData();
});
</script>

<template>
  <Toast />
  <ProductList
    :products="products"
    @on-add-product-to-card="onClickAddToCardProduct"
  />
</template>
