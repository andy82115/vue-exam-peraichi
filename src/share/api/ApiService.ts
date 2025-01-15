import type { FormApiServiceType } from './IApiService';
import type { AxiosInstance, AxiosResponse } from 'axios';
import {
  ApiResponseSchema,
  type ApiResponse,
  type FormSendResponse,
} from './models/FormSendResponse';
import type { FormSendParam } from './models/FormSendParam';
import axios from 'axios';

export class FormApiService implements FormApiServiceType {
  private axiosInstance: AxiosInstance;

  constructor() {
    const apiUrl = '/api';

    // .envからapiURLを取得
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
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
        // Responseのタイプをチェックします。
        const contentType = response.headers['content-type'];
        if (contentType && contentType.includes('text/html')) {
          throw new Error('Received HTML response instead of JSON');
        }
        return response;
      },
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  async formSend(params: FormSendParam): Promise<ApiResponse> {
    try {
      const response = await this.axiosInstance.post<ApiResponse>(
        '/post',
        params,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      console.log('API Response:', {
        status: response.status,
        headers: response.headers,
        data: response.data,
      });

      return response.data;
    } catch (error) {
      console.error('Form send error:', error);
      throw error;
    }
  }
}
