import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { Product } from '@/types/domain/Product';
import { ProductCart } from '@/types/domain/ProductCart';

export const useCartStore = defineStore('cart', () => {
  const cartProducts = ref<ProductCart[]>([]);

  const cartTotal = computed(() => {
    return cartProducts.value.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  });

  const cartFormattedTotal = computed(() => {
    return cartTotal.value.toFixed(2);
  });

  const cartQuantity = computed(() => {
    return cartProducts.value.length;
  });

  const addProductToCart = (product: Product | ProductCart) => {
    const existItem = cartProducts.value.find(
      (productItem) => productItem.id === product.id
    );
    if (existItem) {
      existItem.quantity += 1;
    } else {
      cartProducts.value.push({ ...product, quantity: 1 });
    }
  };

  const decreaseProductQuantity = (id: number)  => {
    const existItem = cartProducts.value.find(
      (productItem) => productItem.id === id
    );

    if(!existItem) return
    if(existItem.quantity === 0) return

    existItem.quantity -= 1;
  }

  const removeProductToCart = (id: number) => {
    const itemIndex = cartProducts.value.findIndex(
      (product) => product.id === id
    );

    if (itemIndex !== -1) {
      cartProducts.value.splice(itemIndex, 1);
    }
  };

  const clearCart = () => {
    cartProducts.value = [];
  };

  return {
    cartProducts,
    addProductToCart,
    clearCart,
    removeProductToCart,
    cartTotal,
    cartQuantity,
    cartFormattedTotal,
    decreaseProductQuantity,
  };
});
