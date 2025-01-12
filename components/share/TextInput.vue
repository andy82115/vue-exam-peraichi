<template>
  <v-container>
    <v-text-field
      v-model="inputValue"
      :label="label"
      :rules="rules"
      variant="outlined"
    />
  </v-container>
</template>

<script setup lang="ts">  
  type ValidationRule = (value: string) => boolean | string;

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
