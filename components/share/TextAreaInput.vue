<template>
  <v-textarea
    v-model="inputValue"
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
  const inputValue = ref(props.modelValue);

  watch(
    () => inputValue.value,
    (newValue) => {
      emit('update:modelValue', newValue);
    }
  );
</script>
