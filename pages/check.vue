<template>
  <div class="w-full h-full px-15 pb-48 md:px-5 bg-[#F6F2EA]">
    <!-- Title -->
    <div class="text-4xl font-bold py-5 text-stone-700">フォーム確認</div>

    <!-- Message -->
    <div class="w-full h-fit p-5 bg-white">
      <p class="text-lg">ご入力いただいた内容を確認してください。</p>
      <!-- Send btn -->
      <div class="w-full h-fit flex flex-row justify-center items-center mt-5">
        <label
          class="w-fit h-fit text-lg font-bold text-white md:mr-2 bg-blue-400 rounded-full px-10 py-3 m-2"
          @click="debouncedCheckForm"
        >
          送信する
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useFormPresenterStore } from '../src/app/presenter/FormPresenter';
  import loadash from 'lodash';

  const presenter = useFormPresenterStore();
  const { sendForm, SendFormStates, newFormSendData } = presenter;
  const { sendFormState } = storeToRefs(presenter);

  const router = useRouter();

  watch(
    () => sendFormState.value,
    (newValue) => {
      if (newValue == SendFormStates.SUCCESS) {
        router.push('/complete');
        newFormSendData();
      }
    }
  );

  const debouncedCheckForm = loadash.debounce(async () => {
    await sendForm();
  }, 500);
</script>
