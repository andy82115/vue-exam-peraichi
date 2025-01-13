<template>
  <v-text-field
    v-model="inputValue"
    :label="label"
    :rules="rules"
    variant="outlined"
  />
</template>

<script setup lang="ts">
  import type { ValidationRule } from './types/ValidationType';

  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: Array as () => ValidationRule[],
      default: [(v: String) => true || 'All pass'],
    },
  });

  const emit = defineEmits(['update:modelValue']);
  const inputValue = ref(props.modelValue);

  watch(
    () => inputValue,
    (newValue) => {
      emit('update:modelValue', newValue);
    }
  );
</script>
