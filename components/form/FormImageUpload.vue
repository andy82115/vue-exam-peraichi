<template>
  <div class="w-full h-fit flex flex-col">
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      accept="image/*"
      style="display: none"
    />

    <button
      @click="triggerFileInput"
      class="w-fit h-fit mb-4 px-4 py-2 bg-gray-300 text-black rounded"
    >
      画像をアップロード
    </button>

    <div v-if="imagesValue.length > 0" class="flex flex-wrap gap-6 mt-4">
      <div v-for="(image, index) in imagesValue" :key="index">
        <RemovableImage :imgSrc="image" @cancel="removeImage(index)" />
      </div>
    </div>

    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useFormPresenterStore } from '../../src/app/presenter/FormPresenter';
  import RemovableImage from '../share/RemovableImage.vue';

  const fileInput = ref<HTMLInputElement | null>(null);
  const error = ref<string>('');

  const presenter = useFormPresenterStore();
  const { formSendData, addImagePath, removeImagePath } = presenter;

  const imagesValue = computed({
    get: () => formSendData.images.value as string[],
    set: (value: string[]) => {
      formSendData.images.value = value;
    },
  });

  const triggerFileInput = () => {
    fileInput.value?.click();
  };

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      error.value = '画像ファイルを選択してください';
      return;
    }

    if (!file.type.startsWith('image/')) {
      error.value = '画像ファイルを選択してください';
      if (fileInput.value) fileInput.value.value = '';
      return;
    }

    error.value = '';

    const reader = new FileReader();
    reader.onload = (e) => {
      const path = e.target?.result as string;
      addImagePath(path);
      if (fileInput.value) {
        fileInput.value.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    removeImagePath(index);
  };
</script>
