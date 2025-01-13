<template>
  <div class="h-fit w-fit flex relative border-2 border-gray-300 overflow-visible">
    <img class="block m-4 w-full h-auto" :src="imgSrc" />

    <button
      class="absolute -top-3 -right-3 z-10 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md"
      @click="handleCancel"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-3 h-3"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';

  defineProps({
    imgSrc: {
      type: String,
      required: true,
    },
  });

  const emit = defineEmits(['cancel']);

  const handleCancel = () => {
    emit('cancel');
  };
</script>
