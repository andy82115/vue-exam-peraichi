import type { FormRepositoryType } from "../../domain/IFormRepository";
import type { FormSendParam } from "../../../share/api/models/FormSendParam";
import type { FormSendResponse } from "../../../share/api/models/FormSendResponse";
import { useRemoteDataSourceProvider } from "../datasource/FormRemoteDatasourceProvider";

// 複数のRemoteDatasourceと複数のLocalDatasourceを用いて、FormRepositoryTypeを実装する
export class FormRepository implements FormRepositoryType {
  private apiProviderStore = useRemoteDataSourceProvider();

  async formSend(params: FormSendParam): Promise<FormSendResponse> {
    try {
      const response = await this.apiProviderStore.remoteDataSource.formSend(params);
      return response;
    } catch (error) {
      console.error("Error sending form data:", error);
      throw error;
    }
  }
}