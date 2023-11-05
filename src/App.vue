<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { storeToRefs } from 'pinia';
import Toast from 'primevue/toast';
import Button from 'primevue/button';

import useProduct from '@/composables/http/useProduct';
import useCategory from '@/composables/http/useCategory';

import { useCartStore } from '@/store/cart';

import { Product } from '@/types/domain/Product';

import ProductList from '@/components/ProductList.vue';
import ProductCart from '@/components/ProductCart.vue';
import SearchProduct from '@/components/SearchProduct.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';

const toast = useToast();
const { getProducts } = useProduct();
const { getCategories } = useCategory();

const cartStore = useCartStore();
const { addProductToCart } = cartStore;
const { cartQuantity } = storeToRefs(cartStore);

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const isLoading = ref(false);
const isProductCardOpen = ref(false);
const searchProductValue = ref('');
const selectedCategory = ref('');

const filteredProducts = computed<Product[]>(() => {
  const filterByName = (product: Product) =>
    product.title
      .toLowerCase()
      .includes(searchProductValue.value.toLowerCase());

  const filterByCategory = (product: Product) =>
    product.category.toLowerCase() === selectedCategory.value.toLowerCase();

  return products.value.filter(
    (product) =>
      filterByName(product) &&
      (!selectedCategory.value || filterByCategory(product))
  );
});

const clearFilters = () => {
  searchProductValue.value = '';
  selectedCategory.value = '';
};

const onChangeCategory = (value: string) => {
  selectedCategory.value = value ?? '';
};

const showToast = (
  severity: 'success' | 'info' | 'warn' | 'error',
  summary: string,
  detail: string
) => {
  toast.add({
    severity,
    summary,
    detail,
    life: 3000,
  });
};

const getAllProducts = async () => {
  try {
    products.value = await getProducts();
  } catch (error) {
    showToast('error', 'Error', 'an error occurred while loading products');
    throw error;
  }
};

const getAllCategories = async () => {
  try {
    categories.value = await getCategories();
  } catch (error) {
    showToast('error', 'Error', 'an error occurred while loading categories');
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
  showToast('success', 'Success', 'product has been added to your cart');
};

const showCart = () => {
  isProductCardOpen.value = true;
};

const hideCart = () => {
  isProductCardOpen.value = false;
};

onMounted(() => {
  getAllData();
});
</script>

<template>
  <Toast />
  <ProductList
    :products="filteredProducts"
    :is-loading="isLoading"
    @on-add-product-to-card="onClickAddToCardProduct"
  >
    <template #tableHeader>
      <div class="flex flex-wrap gap-2 pb-2 md:pb-0">
        <SearchProduct
          v-model="searchProductValue"
          placeholder="Search product"
        />
        <CategoryFilter
          :value="selectedCategory"
          placeholder="Select a category"
          class="w-15rem"
          :categories="categories"
          @on-change-value="onChangeCategory"
        />
        <Button
          icon="pi pi-times"
          title="Clear filters"
          @click="clearFilters"
        />
        <Button
          icon="pi pi-shopping-cart"
          title="Show Cart"
          :badge="cartQuantity.toString()"
          @click="showCart"
        />
      </div>
    </template>
  </ProductList>
  <ProductCart :is-open="isProductCardOpen" @on-close-modal="hideCart" />
</template>
