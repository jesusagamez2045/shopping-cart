<script setup lang="ts">
import Rating from 'primevue/rating';
import Button from 'primevue/button';

import { ProductCart } from '@/types/domain/ProductCart';

type Props = {
  product: ProductCart;
};

defineProps<Props>();

const emit = defineEmits([
  'onClickRemove',
  'onClickIncreaseQuantity',
  'onClickDecreaseQuantity',
]);

const onClickRemoveButton = () => {
  emit('onClickRemove');
};

const onClickIncreaseQuantity = () => {
  emit('onClickIncreaseQuantity');
};

const onClickDecreaseQuantity = () => {
  emit('onClickDecreaseQuantity');
};
</script>

<template>
  <div
    class="flex flex-column xl:flex-row xl:align-items-start p-4 pr-3 gap-4 surface-card border-round surface-border border-1"
  >
    <img
      class="w-7rem h-7rem block xl:block mx-auto border-round"
      :src="product.image"
      :alt="product.title"
    />
    <div
      class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
    >
      <div
        class="flex flex-column align-items-center sm:align-items-start gap-3"
      >
        <div class="text-xl font-bold text-900">
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
        <span class="text-xl font-semibold">${{ product.price }}</span>
        <div class="flex flex-row gap-2 align-items-center">
          <Button
            icon="pi pi-minus"
            rounded
            outlined
            title="Decrease Quantity"
            class="h-2rem w-2rem"
            @click="onClickDecreaseQuantity"
          />
          <span>{{ product.quantity }}</span>
          <Button
            icon="pi pi-plus"
            rounded
            outlined
            title="Increase Quantity"
            class="h-2rem w-2rem"
            @click="onClickIncreaseQuantity"
          />
        </div>
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          class="h-2rem w-2rem"
          title="Remove Product"
          @click="onClickRemoveButton"
        />
      </div>
    </div>
  </div>
</template>
