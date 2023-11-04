<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';

import { useCartStore } from '@/store/cart';

import ProductCardItem from '@/components/ProductCardItem.vue';
import { ProductCart } from '@/types/domain/ProductCart';

type Props = {
  isOpen: boolean;
};

defineProps<Props>();

const emit = defineEmits(['onCloseModal']);

const cartStore = useCartStore();
const {
  removeProductToCart,
  addProductToCart,
  decreaseProductQuantity,
  clearCart,
} = cartStore;
const { cartFormattedTotal, cartProducts } = storeToRefs(cartStore);

const onClickIncreaseQuantity = (product: ProductCart) => {
  addProductToCart(product);
};

const onClickDecreaseQuantity = (product: ProductCart) => {
  decreaseProductQuantity(product.id);
};

const onClickRemoveProduct = (product: ProductCart) => {
  removeProductToCart(product.id);
};

const onClickClearCart = () => {
  clearCart();
};

const closeModal = () => {
  emit('onCloseModal');
};
</script>

<template>
  <Sidebar :visible="isOpen" position="right" block-scroll class="p-sidebar-md">
    <template #container>
      <div class="flex flex-column h-full pt-3 pb-3">
        <div
          class="flex align-items-center justify-content-between flex-shrink-0 px-3"
        >
          <span class="text-3xl font-semibold"> Cart </span>
          <span>
            <Button
              type="button"
              icon="pi pi-times"
              rounded
              outlined
              title="Close"
              class="h-2rem w-2rem"
              @click="closeModal"
            />
          </span>
        </div>
        <div class="pt-3 pl-3">
          <Button
            label="Clear cart"
            outlined
            icon="pi pi-shopping-cart"
            severity="danger"
            size="small"
            @click="onClickClearCart"
          />
        </div>
        <div class="overflow-y-auto my-3 ml-3 pr-3 container-list">
          <ul class="list-none m-0 p-0 gap-2 flex flex-column">
            <li v-for="product in cartProducts" :key="product.id">
              <ProductCardItem
                :product="product"
                @on-click-remove="onClickRemoveProduct(product)"
                @on-click-increase-quantity="onClickIncreaseQuantity(product)"
                @on-click-decrease-quantity="onClickDecreaseQuantity(product)"
              />
            </li>
          </ul>
        </div>
        <div
          class="mt-auto flex align-items-center justify-content-between px-3 pt-2"
        >
          <span class="text-2xl">Total</span>
          <span class="text-2xl p-2 border-round-sm text-white total">
            ${{ cartFormattedTotal }}
          </span>
        </div>
      </div>
    </template>
  </Sidebar>
</template>

<style lang="scss" scoped>
.container-list {
  /* width */
  &::-webkit-scrollbar {
    width: 10px;
    border-radius: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #10b981;
  }
}

.total {
  background-color: #10b981;
}
</style>
