<script setup lang="ts">
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import Skeleton from 'primevue/skeleton';

import { Product } from '@/types/domain/Product';

type Props = {
  product: Product;
  isLoading?: boolean;
};

defineProps<Props>();

const emit = defineEmits(['onAddToCard']);

const onClickButton = () => {
  emit('onAddToCard');
};
</script>

<template>
  <div
    v-if="!isLoading"
    class="p-4 border-1 surface-border surface-card border-round"
  >
    <div
      class="flex flex-wrap align-items-center justify-content-between gap-2"
    >
      <div class="flex align-items-center gap-2">
        <i class="pi pi-tag"></i>
        <span class="font-semibold">{{ product.category }}</span>
      </div>
    </div>
    <div class="flex flex-column align-items-center gap-3 py-5">
      <img
        class="w-6 h-6 sm:w-14rem sm:h-14rem xl:w-16rem xl:h-16rem block xl:block"
        :src="product.image"
        :alt="product.title"
      />
      <div class="text-2xl font-bold">{{ product.title }}</div>
      <Rating :model-value="product.rating.rate" readonly :cancel="false" />
    </div>
    <div class="flex align-items-center justify-content-between">
      <span class="text-2xl font-semibold">${{ product.price }}</span>
      <Button icon="pi pi-shopping-cart" rounded @click="onClickButton" />
    </div>
  </div>
  <div v-else class="p-4 border-1 surface-border surface-card border-round">
    <div
      class="flex flex-wrap align-items-center justify-content-between gap-2"
    >
      <Skeleton class="w-6rem border-round h-2rem" />
      <Skeleton class="w-3rem border-round h-1rem" />
    </div>
    <div class="flex flex-column align-items-center gap-3 py-5">
      <Skeleton class="w-9 shadow-2 border-round h-10rem" />
      <Skeleton class="w-8rem border-round h-2rem" />
      <Skeleton class="w-6rem border-round h-1rem" />
    </div>
    <div class="flex align-items-center justify-content-between">
      <Skeleton class="w-4rem border-round h-2rem" />
      <Skeleton shape="circle" class="w-3rem h-3rem" />
    </div>
  </div>
</template>
