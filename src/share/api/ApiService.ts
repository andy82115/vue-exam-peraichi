import type { FormApiServiceType } from "./IApiService";
import type { AxiosInstance } from "axios";
import type { ApiResponse, FormSendResponse } from "./models/FormSendResponse";
import type { FormSendParam } from "./models/FormSendParam";
import axios from "axios";

export class FormApiService implements FormApiServiceType {
  private axiosInstance: AxiosInstance;

  constructor() {
    const apiUrl = process.env.API_URL;

    // .envからapiURLを取得
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // リクエスト時にトークンを付与 ex: Authorization: Bearer {token}
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          //401 エラーが発生したらここで処理を実施
        }
        return Promise.reject(error);
      }
    );
  }

  async formSend(params: FormSendParam): Promise<ApiResponse> {
    const response = await this.axiosInstance.post<ApiResponse>(
      "/post",
      params
    );
    return response.data;
  }
}
