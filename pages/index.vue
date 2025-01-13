<template>
  <div class="w-full h-full px-15 pb-48 md:px-5 bg-[#F6F2EA]">
    <div class="text-4xl font-bold py-5 text-stone-700">
      お問い合わせフォーム
    </div>
    <div class="w-full h-fit p-5 flex flex-col md:p-20 bg-white">
      <FormNecessary />
      <FormOptional />
      <FormSpacerSm />
      <FormPolicy />
    </div>
  </div>
</template>

<script setup lang="ts">
  import FormNecessary from '../components/form/FormNecessary.vue';
  import FormOptional from '../components/form/FormOptional.vue';
  import FormPolicy from '../components/form/FormPolicy.vue';
  import FormSpacerSm from '../components/form/FormSpacerSm.vue';
  import { useFormPresenterStore } from '../src/app/presenter/FormPresenter';

  const presenter = useFormPresenterStore();
  const { newFormSendData } = presenter;

  newFormSendData();
</script>
