<template>
  <div class="w-full h-fit flex flex-col">
    <!-- 希望返信日　-->
    <CombineInput
      className="w-fit h-fit"
      label-text="希望返信日"
      :label-required="formSendData.expectFeedback.isRequired"
    >
      <DateInput v-model="expectFeedbackValue" label="年/月/日"></DateInput>
    </CombineInput>
    <!-- 希望返信日 end-->
    <div class="w-3 h-2 md:w-10 md:h-5" />
    <!-- 詳細内容　-->
    <CombineInput
      className="w-full h-fit"
      label-text="詳細"
      :label-required="formSendData.describe.isRequired"
    >
      <TextAreaInput
        v-model="describeValue"
        placeholder="入力してください"
      ></TextAreaInput>
    </CombineInput>
  </div>
</template>

<script setup lang="ts">
  import DateInput from '../share/DateInput.vue';
  import TextAreaInput from '../share/TextAreaInput.vue';
  import CombineInput from '../form/CombineInput.vue';
  import { useFormPresenterStore } from '../../src/app/presenter/FormPresenter';

  const presenter = useFormPresenterStore();
  const { formSendData } = presenter;

  const expectFeedbackValue = computed({
    get: () => formSendData.expectFeedback.value as string,
    set: (value: string) => {
      formSendData.expectFeedback.value = value;
    },
  });

  const describeValue = computed({
    get: () => formSendData.describe.value as string,
    set: (value: string) => {
      formSendData.describe.value = value;
    },
  });
</script>
