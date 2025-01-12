// stores/formPresenterStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { useFormRepositoryProvider } from "../data/repository/FormRepositoryProvider";
import type { FormSendData } from "./models/FormSendData";

export const useFormPresenterStore = defineStore("formPresenter", () => {
  const isSendFormLoading = ref(false);
  const formSendData = ref<FormSendData>();
  const repositoryStore = useFormRepositoryProvider();

  const newFormSendData = () => {
    formSendData.value = {
      createdAt: { value: undefined, isRequired: true },
      fullName: { value: "", isRequired: true },
      firstName: { value: "", isRequired: true },
      lastName: { value: "", isRequired: true },
      email: { value: undefined, isRequired: true },
      question: { value: "", isRequired: false },
      expectFeedback: { value: undefined, isRequired: false },
      describe: { value: "", isRequired: false },
      images: { value: [], isRequired: false },
      isPrivatePermission: { value: false, isRequired: true },
      id: { value: undefined, isRequired: true },
    };
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

  return {
    // states
    isSendFormLoading,
    formSendData,
    // actions
    newFormSendData,
    sendForm,
  };
});
