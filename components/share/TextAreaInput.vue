<template>
  <v-textarea
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :placeholder="placeholder"
    :rules="rules"
    variant="outlined"
  />
</template>

<script setup lang="ts">
  type ValidationRule = (value: string) => boolean | string;

  const props = defineProps({
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    rules: {
      type: Array as () => ValidationRule[],
      default: [(v: String) => true || 'All pass'],
    },
  });

  const emit = defineEmits(['update:modelValue']);
</script>
