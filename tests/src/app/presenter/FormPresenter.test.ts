import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFormPresenterStore } from '../../../../src/app/presenter/FormPresenter';

vi.mock('../../../../src/app/data/repository/FormRepositoryProvider', () => ({
  useFormRepositoryProvider: vi.fn(() => ({
    formRepository: {
      formSend: vi.fn().mockResolvedValue({ success: true }),
    },
  })),
}));

describe('formPresenterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with default state', () => {
    const store = useFormPresenterStore();
    expect(store.sendFormState).toBe(store.SendFormStates.INIT);
    expect(store.invalidErrors).toEqual([]);
    expect(store.formSendData).toBeDefined();
  });

  it('should validate form data and detect invalid fields', async () => {
    const store = useFormPresenterStore();
    const { ErrorMessages } = store;

    store.formSendData.firstName.value = '';
    store.formSendData.lastName.value = '';
    store.formSendData.email.value = 'invalid-email';
    store.formSendData.expectFeedback.value = '1996/23';

    await store.checkForm();

    expect(store.sendFormState).toBe(store.SendFormStates.INVALID);
    expect(store.invalidErrors).toContain(ErrorMessages.EMPTY_FIRST_NAME);
    expect(store.invalidErrors).toContain(ErrorMessages.EMPTY_LAST_NAME);
    expect(store.invalidErrors).toContain(ErrorMessages.INVALID_EMAIL);
    expect(store.invalidErrors).toContain(ErrorMessages.CHECK_PERMISSION);
    expect(store.invalidErrors).toContain(ErrorMessages.INVALID_DATE);

    store.formSendData.email.value = '';
    await store.checkForm();
    expect(store.invalidErrors).toContain(ErrorMessages.EMPTY_EMAIL);
  });

  it('should validate form data and detect valid fields', async () => {
    const store = useFormPresenterStore();

    store.formSendData.firstName.value = 'John';
    store.formSendData.lastName.value = 'Doe';
    store.formSendData.email.value = 'john.doe@example.com';
    store.formSendData.isPrivatePermission.value = true;

    await store.checkForm();

    expect(store.sendFormState).toBe(store.SendFormStates.VALID);
    expect(store.invalidErrors).toEqual([]);
  });

  it('should send form successfully when data is valid', async () => {
    const store = useFormPresenterStore();

    store.formSendData.firstName.value = 'John';
    store.formSendData.lastName.value = 'Doe';
    store.formSendData.email.value = 'john.doe@example.com';
    store.formSendData.isPrivatePermission.value = true;

    const response = await store.sendForm();

    expect(response).toEqual({ success: true });
    expect(store.sendFormState).toBe(store.SendFormStates.SUCCESS);
  });

  it('should fail to send form when data is invalid', async () => {
    const store = useFormPresenterStore();

    // Mock invalid form data
    store.formSendData.firstName.value = '';
    store.formSendData.lastName.value = '';
    store.formSendData.email.value = '';

    const response = await store.sendForm();

    expect(store.sendFormState).toBe(store.SendFormStates.INVALID);
    expect(response).toBeUndefined();
  });

  it('should add and remove image paths', () => {
    const store = useFormPresenterStore();

    store.addImagePath('/path/to/image1.jpg');
    store.addImagePath('/path/to/image2.jpg');

    expect(store.formSendData.images.value).toEqual([
      '/path/to/image1.jpg',
      '/path/to/image2.jpg',
    ]);

    store.removeImagePath(0);
    expect(store.formSendData.images.value).toEqual(['/path/to/image2.jpg']);
  });
});
