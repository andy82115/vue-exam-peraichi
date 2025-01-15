// stores/formPresenterStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFormRepositoryProvider } from '../data/repository/FormRepositoryProvider';
import { formSendDataToParam, type FormSendData } from './models/FormSendData';
import type { ValidationRule } from '../../../components/share/types/ValidationType';
import type { FormSendParam } from '../../../src/share/api/models/FormSendParam';

// fake data
const questionList = [
  '商品について',
  '運送について',
  '支払いについて',
  'カスタマーサービスについて',
  '全体的な満足度',
];

const ErrorMessages = {
  EMPTY_FIRST_NAME: '名を空にすることはできません。',
  EMPTY_LAST_NAME: '姓を空にすることはできません',
  EMPTY_EMAIL: 'メールを空にすることはできません。',
  INVALID_EMAIL: '有効なメールアドレスを入力してください。',
  CHECK_PERMISSION: '許可を確認してください',
  INVALID_DATE: '希望返信日は有効な日付ではありません。',
};

// api send state
const SendFormStates = {
  INIT: 'init',
  INVALID: 'invalid',
  VALID: 'valid',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAIL: 'fail',
};

type SendFormState = (typeof SendFormStates)[keyof typeof SendFormStates];

const createDefaultFormSendData = (): FormSendData => ({
  createdAt: { value: undefined, isRequired: true },
  fullName: { value: '', isRequired: true },
  firstName: { value: '', isRequired: true },
  lastName: { value: '', isRequired: true },
  email: { value: '', isRequired: true },
  question: { value: questionList[0], isRequired: true },
  expectFeedback: { value: undefined, isRequired: false },
  describe: { value: '', isRequired: false },
  images: { value: [], isRequired: false },
  isPrivatePermission: { value: false, isRequired: true },
  id: { value: undefined, isRequired: true },
});

// PiniaでForm画面の状態管理
export const useFormPresenterStore = defineStore('formPresenter', () => {
  const sendFormState = ref<SendFormState>(SendFormStates.INIT);
  const invalidErrors = ref<string[]>([]);
  const repositoryStore = useFormRepositoryProvider();
  const formSendData = ref<FormSendData>(createDefaultFormSendData());

  // Actions
  const newFormSendData = () => {
    formSendData.value = createDefaultFormSendData();
  };

  const initSendFormState = () => {
    sendFormState.value = SendFormStates.INIT;
  };

  // validチェック
  const checkForm = async () => {
    sendFormState.value = SendFormStates.LOADING;
    const params = formSendDataToParam(formSendData.value);

    if (!checkDataValid(params)) {
      sendFormState.value = sendFormStates.INVALID;
    } else {
      sendFormState.value = sendFormStates.VALID;
    }
  };

  // Formの送信
  const sendForm = async () => {
    sendFormState.value = SendFormStates.LOADING;
    const params = formSendDataToParam(formSendData.value);

    // 再validチェック
    if (!checkDataValid(params)) {
      sendFormState.value = sendFormStates.INVALID;
      return;
    }

    // Data Create
    params.fullName = `${params.lastName || ''}${params.firstName || ''}`;
    params.createdAt = new Date().toISOString();
    params.id = params.fullName + params.createdAt;

    try {
      const response = await repositoryStore.formRepository.formSend(params);
      console.log('responsee value -> ', response);
      sendFormState.value = sendFormStates.SUCCESS;
      return response;
    } catch (error) {
      sendFormState.value = sendFormStates.FAIL;
    }
  };

  const checkDataValid = (params: FormSendParam): boolean => {
    const errors: string[] = [];

    if (!inputRequirdCheck(params.firstName ?? '')) {
      errors.push(ErrorMessages.EMPTY_FIRST_NAME);
    }
    if (!inputRequirdCheck(params.lastName ?? '')) {
      errors.push(ErrorMessages.EMPTY_LAST_NAME);
    }
    if (!inputRequirdCheck(params.email ?? '')) {
      errors.push(ErrorMessages.EMPTY_EMAIL);
    } else {
      if (!emailValidCheck(params.email ?? '')) {
        errors.push(ErrorMessages.INVALID_EMAIL);
      }
    }
    if (!params.isPrivatePermission) {
      errors.push(ErrorMessages.CHECK_PERMISSION);
    }

    if (params.expectFeedback) {
      const [year, month, day] = params.expectFeedback.split('/').map(Number);

      if (
        !year ||
        !month ||
        !day ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
      ) {
        errors.push(ErrorMessages.INVALID_DATE);
      } else {
        // Javascriptの月は0から11
        const parsedDate = new Date(year, month - 1, day);

        // Dateは正しくない場合、getTime()はNaNを返信します。
        if (isNaN(parsedDate.getTime())) {
          errors.push(ErrorMessages.INVALID_DATE);
        } else {
          params.expectFeedback = parsedDate.toISOString();
        }
      }
    }

    if (errors.length > 0) {
      console.error('Validation Errors:', errors);
      invalidErrors.value = errors;
      return false;
    } else {
      invalidErrors.value = [];
      return true;
    }
  };

  const addImagePath = (path: string) => {
    const oldValue = formSendData.value.images.value as string[];
    formSendData.value.images.value = [...oldValue, path];
  };

  const removeImagePath = (index: number) => {
    const oldValue = formSendData.value.images.value as string[];
    oldValue.splice(index, 1);
    formSendData.value.images.value = [...oldValue];
  };

  //Rules
  const inputRequirdCheck = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const inputRequiredRule: ValidationRule = (value: string) => {
    return inputRequirdCheck(value) || 'This field cannot be empty.';
  };

  const emailValidCheck = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  };

  const emailRule: ValidationRule = (value: string) => {
    return emailValidCheck(value) || 'Please enter a valid email address.';
  };

  //Fake Datas
  const askForQuestionList = questionList;

  //State types
  const sendFormStates = SendFormStates;

  return {
    // states
    sendFormState,
    formSendData,
    inputRequiredRule,
    invalidErrors,
    emailRule,
    askForQuestionList,
    SendFormStates,
    ErrorMessages,
    // actions
    newFormSendData,
    sendForm,
    checkForm,
    initSendFormState,
    addImagePath,
    removeImagePath,
  };
});
