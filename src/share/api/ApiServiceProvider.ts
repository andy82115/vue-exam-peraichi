import { defineStore } from "pinia";
import type { FormApiServiceType } from "./ApiServiceInterfaces";
import { FormApiService } from "./ApiService";

export const useApiStore = defineStore("apiStore", () => {
  const formApiService: FormApiServiceType = new FormApiService();

  return {
    apiFormService: formApiService,
  };
});
