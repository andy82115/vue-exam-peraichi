<template>
  <div class="w-full h-fit flex flex-col">
    <!-- 希望返信日　-->
    <CombineInput
      className="w-fit h-fit"
      label-text="希望返信日"
      :label-required="formSendData.expectFeedback.isRequired"
    >
      <DateInput
        v-model="formSendData.expectFeedback.value as string"
        label="年/月/日"
      ></DateInput>
    </CombineInput>
    <!-- 希望返信日 end-->
    <FormSpacerSm />
    <!-- 詳細内容　-->
    <CombineInput
      className="w-full h-fit"
      label-text="詳細"
      :label-required="formSendData.describe.isRequired"
    >
      <TextAreaInput
        v-model="formSendData.describe.value as string"
        placeholder="入力してください"
      ></TextAreaInput>
    </CombineInput>
    <!-- 詳細内容 end-->
    <FormSpacerSm />
    <!-- 画像　-->
    <CombineInput
      className="w-fit h-fit"
      label-text="画像"
      :label-required="formSendData.images.isRequired"
    >
      <FormImageUpload></FormImageUpload>
    </CombineInput>
  </div>
</template>

<script setup lang="ts">
  import DateInput from '../share/DateInput.vue';
  import TextAreaInput from '../share/TextAreaInput.vue';
  import CombineInput from '../form/CombineInput.vue';
  import FormImageUpload from './FormImageUpload.vue';
  import { useFormPresenterStore } from '../../src/app/presenter/FormPresenter';

  const presenter = useFormPresenterStore();
  const { formSendData } = presenter;
</script>
