<template>
  <v-select
    v-model="selectedValue"
    :items="options"
    :label="label"
    variant="outlined"
  />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    rules: {
      type: Array,
      default: () => [(v: string) => !!v || 'This field is required'],
    },
  });

  const emit = defineEmits(['update:modelValue']);
  const selectedValue = ref(props.modelValue);

  watch(
    () => selectedValue.value,
    (newValue) => {
      emit('update:modelValue', newValue);
    }
  );

  watch(
    () => props.modelValue,
    (newValue) => {
      selectedValue.value = newValue;
    }
  );
</script>
