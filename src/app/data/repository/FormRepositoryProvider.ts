import { defineStore } from 'pinia';
import { FormRepository } from './FormRepository';
import type { FormRepositoryType } from '../../domain/IFormRepository';

export const useFormRepositoryProvider = defineStore('formRepository', () => {
  const formRepository: FormRepositoryType = new FormRepository();

  return {
    formRepository,
  };
});
