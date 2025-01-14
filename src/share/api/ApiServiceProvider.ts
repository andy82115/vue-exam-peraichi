import { defineStore } from 'pinia';
import type { FormApiServiceType } from './IApiService';
import { FormApiService } from './ApiService';

export const useApiProvider = defineStore('apiProvider', () => {
  const formApiService: FormApiServiceType = new FormApiService();

  return {
    apiFormService: formApiService,
  };
});
