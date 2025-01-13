<template>
  <div class="w-full h-fit flex flex-col">
    <div class="w-fit h-fit">bla bla bla</div>
    <label class="w-fit h-fit">
      <a
        class="text-blue-500 hover:underline"
        href="https://en.wikipedia.org/wiki/Private_law"
        target="_blank"
        rel="noopener noreferrer"
      >
        click here
      </a>
      asdfsdffdff
    </label>
    <div class="w-fit h-fit flex flex-row items-center">
      <label for="private-checkbox">
        <input type="checkbox" id="private-checkbox" v-model="isPrivatePermissionValue" />
        I agree to the terms and conditions
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
