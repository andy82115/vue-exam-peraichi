import type { FormDataSourceType } from "../../domain/IFormRemoteDatasource";
import type { FormSendParam } from "../../../share/api/models/FormSendParam";
import type { FormSendResponse } from "../../../share/api/models/FormSendResponse";
import { useApiProvider } from "../../../share/api/ApiServiceProvider";

export class FormRemoteDataSource implements FormDataSourceType {
  private apiProviderStore = useApiProvider();

  async formSend(params: FormSendParam): Promise<FormSendResponse> {
    try {
      const response = await this.apiProviderStore.apiFormService.formSend(params);
      return response.json as FormSendResponse;
    } catch (error) {
      console.error("Error sending form data:", error);
      throw error;
    }
  }
}
