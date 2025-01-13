<template>
  <div class="w-full h-fit flex flex-col">
    <!-- 名前の入力 -->
    <div class="w-full h-fit flex flex-col md:flex-row">
      <CombineInput
        className="w-full h-fit"
        label-text="お名前（姓）"
        :label-required="formSendData.lastName.isRequired"
      >
        <TextInput
          v-model="formSendData.lastName.value as string"
          label="姓"
          :rules="[inputRequiredRule]"
        ></TextInput>
      </CombineInput>

      <FormSpacerSm />

      <CombineInput
        className="w-full h-fit"
        label-text="（名）"
        :label-required="formSendData.firstName.isRequired"
      >
        <TextInput
          v-model="formSendData.firstName.value as string"
          label="名"
          :rules="[inputRequiredRule]"
        ></TextInput>
      </CombineInput>
    </div>
    <!-- 名前の入力 end -->
    <FormSpacerSm />
    <!-- メールアドレスの入力 -->
    <CombineInput
      className="w-full h-fit"
      label-text="メールアドレス"
      :label-required="formSendData.email.isRequired"
    >
      <TextInput
        v-model="formSendData.email.value as string"
        label="メールアドレス"
        :rules="[inputRequiredRule, emailRule]"
      ></TextInput>
    </CombineInput>
    <!-- メールアドレスの入力 end-->
    <FormSpacerSm />
    <!-- 質問の選択-->
    <CombineInput
      className="w-fit h-fit"
      label-text="お問い合わせ内容"
      :label-required="formSendData.question.isRequired"
    >
      <SelectInput
        v-model="formSendData.question.value as string"
        :options="askForQuestionList"
      ></SelectInput>
    </CombineInput>
  </div>
</template>

<script setup lang="ts">
  import TextInput from '../share/TextInput.vue';
  import SelectInput from '../share/SelectInput.vue';
  import CombineInput from '../form/CombineInput.vue';
  import FormSpacerSm from './FormSpacerSm.vue';
  import { useFormPresenterStore } from '../../src/app/presenter/FormPresenter';

  const presenter = useFormPresenterStore();
  const { formSendData, inputRequiredRule, emailRule, askForQuestionList } = presenter;
</script>
