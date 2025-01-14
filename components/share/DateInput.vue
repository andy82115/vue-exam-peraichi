<template>
  <v-text-field
    v-model="formattedDate"
    :label="label"
    :rules="rules"
    variant="outlined"
    @input="formatDate"
    maxlength="10"
  />
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
      default: 'Enter a date (YYYY/MM/DD)',
    },
    rules: {
      type: Array as () => ValidationRule[],
      default: () => [
        (v: string) => {
          const formatIsValid = /^[0-9]{4}\/([0-9]{2})\/([0-9]{2})$/.test(v);
          if (!formatIsValid) return 'Invalid date format. Use YYYY/MM/DD.';

          const [year, month, day] = v
            .split('/')
            .map((item) => parseInt(item, 10));

          if (month < 1 || month > 12) {
            return 'Month must be between 01 and 12.';
          }

          const daysInMonth = new Date(year, month, 0).getDate();
          if (day < 1 || day > daysInMonth) {
            return `Day must be between 01 and ${daysInMonth}.`;
          }

          return true;
        },
      ],
    },
  });

  const emit = defineEmits(['update:modelValue']);
  const formattedDate = ref(props.modelValue);

  watch(
    () => formattedDate.value,
    (newValue) => {
      emit('update:modelValue', newValue);
    }
  );

  const formatDate = () => {
    let date = formattedDate.value.replace(/\D/g, '');
    if (date.length > 4) date = `${date.slice(0, 4)}/${date.slice(4)}`;
    if (date.length > 7) date = `${date.slice(0, 7)}/${date.slice(7)}`;
    formattedDate.value = date.slice(0, 10);
  };
</script>
