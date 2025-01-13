// stores/formPresenterStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFormRepositoryProvider } from '../data/repository/FormRepositoryProvider';
import type { FormSendData } from './models/FormSendData';
import type { ValidationRule } from '../../../components/share/types/ValidationType'

// fake data
const questionList = [
  "商品について",
  "運送について",
  "支払いについて",
  "カスタマーサービスについて",
  "全体的な満足度"
]

const createDefaultFormSendData = (): FormSendData => ({
  createdAt: { value: undefined, isRequired: true },
  fullName: { value: '', isRequired: true },
  firstName: { value: '', isRequired: true },
  lastName: { value: '', isRequired: true },
  email: { value: '', isRequired: true },
  question: { value: questionList[0], isRequired: true },
  expectFeedback: { value: '', isRequired: false },
  describe: { value: '', isRequired: false },
  images: { value: [], isRequired: false },
  isPrivatePermission: { value: false, isRequired: true },
  id: { value: undefined, isRequired: true },
});

export const useFormPresenterStore = defineStore('formPresenter', () => {
  const isSendFormLoading = ref(false);
  const repositoryStore = useFormRepositoryProvider();
  const formSendData = ref<FormSendData>(createDefaultFormSendData());

  const newFormSendData = () => {
    formSendData.value = createDefaultFormSendData();
  };

  const sendForm = async (params: any) => {
    isSendFormLoading.value = true;
    try {
      const response = await repositoryStore.formRepository.formSend(params);
      return response;
    } catch (error) {
      throw error;
    } finally {
      isSendFormLoading.value = false;
    }
  };

  //Rules
  const inputRequiredRule: ValidationRule = (value: string) => {
    return value.trim().length > 0 || 'This field cannot be empty.';
  };

  const emailRule: ValidationRule = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value) || 'Please enter a valid email address.';
  };

  //Fake Data
  const askForQuestionList = questionList

  return {
    // states
    isSendFormLoading,
    formSendData,
    inputRequiredRule,
    emailRule,
    askForQuestionList,
    // actions
    newFormSendData,
    sendForm,
  };
});
