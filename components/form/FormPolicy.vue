<template>
  <div class="w-full h-fit font-bold flex flex-col">
    <div class="w-fit h-fit">個人情報の取扱について</div>
    <label class="w-fit h-fit font-normal">
      <a
        class="text-blue-500 hover:underline"
        href="https://en.wikipedia.org/wiki/Private_law"
        target="_blank"
        rel="noopener noreferrer"
      >
        こちら
      </a>
      をご確認の上、同意をお願いいたします。
    </label>
    <div class="w-fit h-fit font-normal flex flex-row items-center">
      <label for="private-checkbox">
        <input type="checkbox" id="private-checkbox" v-model="isPrivatePermissionValue" />
        個人情報の取扱について同意する
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useFormPresenterStore } from '../../src/app/presenter/FormPresenter';

  const presenter = useFormPresenterStore();
  const { formSendData } = presenter;

  const isPrivatePermissionValue = computed({
    get: () => formSendData.isPrivatePermission.value as string,
    set: (value: string) => {
      formSendData.isPrivatePermission.value = value;
    },
  });
</script>
