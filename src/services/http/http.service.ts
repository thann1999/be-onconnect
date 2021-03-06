import axios, { AxiosRequestHeaders, Method } from 'axios';
import { HttpMethod, HttpOptions } from './http.type';

export class HttpService {
  public get<T>(uri: string, options?: HttpOptions): Promise<T | undefined> {
    return this.request(uri, HttpMethod.GET, options);
  }

  public post<T>(uri: string, options?: HttpOptions): Promise<T | undefined> {
    return this.request(uri, HttpMethod.POST, options);
  }

  public put<T>(uri: string, options?: HttpOptions): Promise<T | undefined> {
    return this.request(uri, HttpMethod.PUT, options);
  }

  public delete<T>(uri: string, options?: HttpOptions): Promise<T | undefined> {
    return this.request(uri, HttpMethod.DELETE, options);
  }

  public async request<T>(
    uri: string,
    method: Method,
    options?: HttpOptions
  ): Promise<T | undefined> {
    const url = this.resolveUri(uri);

    try {
      const response = await axios.request({
        url,
        method,
        data: options?.body,
        params: options?.queryParams,
        headers: this.generateHeader(options?.headers),
        onUploadProgress: options?.onUploadProgress,
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data;
      } else {
        throw new Error('Error');
      }
    }
  }

  private generateHeader = (header?: AxiosRequestHeaders): AxiosRequestHeaders => {
    const username = process.env.PBX_USERNAME;
    const password = process.env.PBX_PASSWORD;
    const basicAuth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    return {
      ...header,
      Authorization: basicAuth,
    };
  };

  private resolveUri(uri: string): string {
    if (/^(http|https):\/\/.+$/.test(uri)) {
      return uri;
    }
    return `${process.env.APP_BASE_API_URL}${uri}`;
  }
}

export default new HttpService();
