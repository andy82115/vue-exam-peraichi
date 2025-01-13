<template>
  <div class="w-full h-full px-15 pb-48 md:px-5 bg-[#F6F2EA]">
    <!-- Title -->
    <div class="text-4xl font-bold py-5 text-stone-700">
      お問い合わせフォーム
    </div>
    <!-- Body -->
    <div class="w-full h-fit p-5 flex flex-col md:p-20 bg-white">
      <FormNecessary />
      <FormOptional />
      <FormSpacerSm />
      <FormPolicy />
    </div>
    <!-- Send btn -->
    <div class="w-full h-fit flex flex-row justify-center items-center">
      <label
        class="w-fit h-fit text-lg font-bold text-white md:mr-2 bg-blue-400 rounded-full px-10 py-3 m-2"
        @click="debouncedCheckForm"
      >
        送信する
      </label>
    </div>
    <!-- Loading Dialog -->
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-list-box"
        :subtitle="sendFormState"
        title="送信状態"
      >
        <!-- Error msg -->
        <template v-slot:text>
          <div
            v-if="sendFormState === SendFormStates.INVALID"
            class="text-red-500"
          >
            <p v-for="(error, index) in invalidErrors" :key="index">
              {{ error }}
            </p>
          </div>
        </template>

        <!-- Btn -->
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="sendFormState !== SendFormStates.VALID"
            @click="dismissDialog"
          >
            戻る
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
  import FormNecessary from '../components/form/FormNecessary.vue';
  import FormOptional from '../components/form/FormOptional.vue';
  import FormPolicy from '../components/form/FormPolicy.vue';
  import FormSpacerSm from '../components/form/FormSpacerSm.vue';
  import loadash from 'lodash';
  import { useFormPresenterStore } from '../src/app/presenter/FormPresenter';
  import { storeToRefs } from 'pinia';

  const presenter = useFormPresenterStore();
  const { newFormSendData, checkForm, SendFormStates, initSendFormState } =
    presenter;

  const { sendFormState, invalidErrors } = storeToRefs(presenter);

  const router = useRouter();

  const dialog = ref(false);

  const debouncedCheckForm = loadash.debounce(async () => {
    await checkForm();
  }, 500);

  const dismissDialog = loadash.debounce(async () => {
    dialog.value = false;
    await new Promise((resolve) => setTimeout(resolve, 200));
    initSendFormState();
  }, 300);

  onUnmounted(() => {
    debouncedCheckForm.cancel();
    dismissDialog.cancel();
  });

  watch(
    () => sendFormState.value,
    (newState) => {
      dialog.value = newState !== SendFormStates.INIT;
      if (sendFormState.value == SendFormStates.VALID) {
        router.push('/check');
      }
    }
  );

  newFormSendData();
</script>
