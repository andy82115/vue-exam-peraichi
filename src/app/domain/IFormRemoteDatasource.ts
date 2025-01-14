import type { FormSendParam } from "../../share/api/models/FormSendParam";
import type { FormSendResponse } from "../../share/api/models/FormSendResponse";

export interface FormDataSourceType {
  formSend(params: FormSendParam): Promise<FormSendResponse>;
}
