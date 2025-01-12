import type { FormSendParam } from "../../share/api/models/FormSendParam";
import type { FormSendResponse } from "../../share/api/models/FormSendResponse";

export interface FormRepositoryType {
  formSend(params: FormSendParam): Promise<FormSendResponse>;
}