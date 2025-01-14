import type { FormSendParam } from './models/FormSendParam';
import type { FormSendResponse, ApiResponse } from './models/FormSendResponse';

export interface FormApiServiceType {
  formSend(params: FormSendParam): Promise<ApiResponse>;
}
