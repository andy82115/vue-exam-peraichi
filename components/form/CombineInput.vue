<template>
  <div :class="['flex flex-col items-center', className]">
    <FormLabel :label-text="labelText" :label-required="labelRequired" />

    <div class="w-3 h-3" />

    <div class="w-full h-fit">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import FormLabel from '../share/FormLabel.vue';

  const props = defineProps({
    labelText: {
      type: String,
      required: true,
    },
    labelRequired: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
  });
</script>
