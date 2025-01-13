<template>
  <div class="w-full h-fit flex flex-row items-center">
    <label class="text-sm font-extrabold text-gray-500 md:mr-2">
      {{ labelText }}
    </label>
    <div class="w-2 h-2"></div>
    <label
      v-if="labelRequired"
      class="text-sm font-bold text-white md:mr-2 bg-red-600 rounded-lg px-3 py-1 m-2"
    >
      必須
    </label>
    <label
      v-else
      class="text-sm font-bold text-black md:mr-2 bg-gray-400 rounded-lg px-3 py-1 p-3 m-2"
    >
      任意
    </label>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    labelText: {
      type: String,
      required: true,
    },
    labelRequired: {
      type: Boolean,
      default: false,
    },
  });
</script>
