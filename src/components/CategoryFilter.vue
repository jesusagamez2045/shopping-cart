<script setup lang="ts">
import { ref, watch } from 'vue';
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown';

type Props = {
  value: string;
  placeholder?: string;
  categories: string[];
};

const props = defineProps<Props>();

const emit = defineEmits(['onChangeValue']);

const localValue = ref();

const onChange = (event: DropdownChangeEvent) => {
  emit('onChangeValue', event.value);
};

watch(
  () => props.value,
  (newVal) => {
    localValue.value = newVal;
  },
  { immediate: true }
);
</script>

<template>
  <Dropdown
    :model-value="localValue"
    :options="categories"
    :placeholder="placeholder"
    :class="$attrs.class"
    show-clear
    @change="onChange"
  />
</template>
