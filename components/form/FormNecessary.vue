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
            v-model="lastNameValue"
            label="姓"
            :rules="[inputRequiredRule]"
          ></TextInput>
        </CombineInput>
  
        <div class="w-3 h-2 md:w-10 md:h-5" />
  
        <CombineInput
          className="w-full h-fit"
          label-text="（名）"
          :label-required="formSendData.firstName.isRequired"
        >
          <TextInput
            v-model="firstNameValue"
            label="名"
            :rules="[inputRequiredRule]"
          ></TextInput>
        </CombineInput>
      </div>
      <!-- 名前の入力 end -->
      <div class="w-3 h-2 md:w-10 md:h-5" />
      <!-- メールアドレスの入力 -->
      <CombineInput
        className="w-full h-fit"
        label-text="メールアドレス"
        :label-required="formSendData.email.isRequired"
      >
        <TextInput
          v-model="emailValue"
          label="メールアドレス"
          :rules="[inputRequiredRule, emailRule]"
        ></TextInput>
      </CombineInput>
      <!-- メールアドレスの入力 end-->
      <div class="w-3 h-2 md:w-10 md:h-5" />
      <!-- 質問の選択-->
      <CombineInput
        className="w-fit h-fit"
        label-text="お問い合わせ内容"
        :label-required="formSendData.question.isRequired"
      >
        <SelectInput
          v-model="questionValue"
          :options="askForQuestionList"
        ></SelectInput>
      </CombineInput>
    </div>
  </template>
  
  <script setup lang="ts">
    import TextInput from '../share/TextInput.vue';
    import SelectInput from '../share/SelectInput.vue';
    import CombineInput from '../form/CombineInput.vue';
    import { useFormPresenterStore } from '../../src/app/presenter/FormPresenter';
    
    const presenter = useFormPresenterStore();
    const {
      formSendData,
      inputRequiredRule,
      emailRule,
      askForQuestionList,
    } = presenter;
    
    const lastNameValue = computed({
      get: () => formSendData.lastName.value as string,
      set: (value: string) => {
        formSendData.lastName.value = value;
      },
    });
  
    const firstNameValue = computed({
      get: () => formSendData.firstName.value as string,
      set: (value: string) => {
        formSendData.firstName.value = value;
      },
    });
  
    const emailValue = computed({
      get: () => formSendData.email.value as string,
      set: (value: string) => {
        formSendData.email.value = value;
      },
    });
  
    const questionValue = computed({
      get: () => formSendData.question.value as string,
      set: (value: string) => {
        formSendData.question.value = value;
      },
    });
  </script>
  