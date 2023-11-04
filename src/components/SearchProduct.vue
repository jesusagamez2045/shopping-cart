<script setup lang="ts">
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';

type Props = {
  modelValue: string;
  placeholder?: string;
};

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const value = ref();

const onInput = (value: string) => {
  emit('update:modelValue', value);
};

watch(
  () => props.modelValue,
  (newVal) => {
    value.value = newVal;
  },
  { immediate: true }
);
</script>

<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <InputText
      :model-value="value"
      :placeholder="placeholder"
      @update:model-value="onInput"
    />
  </span>
</template>
