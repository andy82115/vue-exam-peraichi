<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="handleInput"
    @keypress="validateKeyPress"
    :label="label"
    :rules="rules"
    variant="outlined"
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

  const validateKeyPress = (event: KeyboardEvent) => {
    if (
      !/[\d/]/.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete'
    ) {
      event.preventDefault();
    }

    if (event.key === '/' && props.modelValue.includes('/')) {
      const slashCount = (props.modelValue.match(/\//g) || []).length;
      if (slashCount >= 2) {
        event.preventDefault();
      }
    }
  };

  const handleInput = (value: string) => {
    let cleanValue = value.replace(/[^\d/]/g, '');

    let formattedDate = cleanValue;
    const numbers = cleanValue.replace(/\//g, '');

    if (numbers.length >= 4 && !formattedDate.includes('/')) {
      formattedDate = `${numbers.slice(0, 4)}/${numbers.slice(4)}`;
    }
    if (numbers.length >= 6 && formattedDate.split('/').length < 3) {
      formattedDate = `${formattedDate.slice(0, 7)}/${numbers.slice(6)}`;
    }

    emit('update:modelValue', formattedDate.slice(0, 10));
  };
</script>
