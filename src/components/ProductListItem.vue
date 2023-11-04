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
    class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
  >
    <img
      class="w-6 h-6 sm:w-16rem sm:h-16rem xl:w-10rem xl:h-10rem block xl:block mx-auto border-round"
      :src="product.image"
      :alt="product.title"
    />
    <div
      class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
    >
      <div
        class="flex flex-column align-items-center sm:align-items-start gap-3"
      >
        <div class="text-2xl font-bold text-900">
          {{ product.title }}
        </div>
        <Rating :model-value="product.rating.rate" readonly :cancel="false" />
        <div class="flex align-items-center gap-3">
          <span class="flex align-items-center gap-2">
            <i class="pi pi-tag"></i>
            <span class="font-semibold">{{ product.category }}</span>
          </span>
        </div>
      </div>
      <div
        class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
      >
        <span class="text-2xl font-semibold">${{ product.price }}</span>
        <Button icon="pi pi-shopping-cart" rounded @click="onClickButton" />
      </div>
    </div>
  </div>
  <div
    v-else
    class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
  >
    <Skeleton
      class="w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem block xl:block mx-auto border-round"
    />
    <div
      class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
    >
      <div
        class="flex flex-column align-items-center sm:align-items-start gap-3"
      >
        <Skeleton class="w-8rem border-round h-2rem" />
        <Skeleton class="w-6rem border-round h-1rem" />
        <div class="flex align-items-center gap-3">
          <Skeleton class="w-6rem border-round h-1rem" />
          <Skeleton class="w-3rem border-round h-1rem" />
        </div>
      </div>
      <div
        class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
      >
        <Skeleton class="w-4rem border-round h-2rem" />
        <Skeleton shape="circle" class="w-3rem h-3rem" />
      </div>
    </div>
  </div>
</template>
