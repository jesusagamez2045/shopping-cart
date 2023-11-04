<script setup lang="ts">
import { ref } from 'vue';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';

import { Product } from '@/types/domain/Product';

import ProducListItem from '@/components/ProductListItem.vue';
import ProductGridItem from '@/components/ProductGridItem.vue';

type Props = {
  products: Product[];
  isLoading?: boolean;
};

defineProps<Props>();

const emit = defineEmits<(e: 'onAddProductToCard', product: Product) => void>();

const layout = ref<'list' | 'grid' | undefined>('grid');

const onAddToCard = (product: Product) => {
  emit('onAddProductToCard', product);
};
</script>

<template>
  <DataView :value="products" :layout="layout" data-key="id">
    <template #header>
      <div class="flex flex-wrap justify-content-between align-items-center">
        <slot name="tableHeader"></slot>
        <DataViewLayoutOptions v-model="layout" />
      </div>
    </template>
    <template #list="slotProps">
      <div class="col-12">
        <ProducListItem
          :product="slotProps.data"
          :is-loading="isLoading"
          @on-add-to-card="onAddToCard(slotProps.data)"
        />
      </div>
    </template>
    <template #grid="slotProps">
      <div class="col-12 sm:col-6 lg:col-6 xl:col-4 p-2">
        <ProductGridItem
          :product="slotProps.data"
          :is-loading="isLoading"
          @on-add-to-card="onAddToCard(slotProps.data)"
        />
      </div>
    </template>
  </DataView>
</template>
