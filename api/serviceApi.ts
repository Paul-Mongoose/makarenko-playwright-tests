import { URLS } from '@data/urls.data';
import { ILoginBody, IResponse } from '@interfaces/ICommon';
import { APIRequestContext, request, APIResponse } from '@playwright/test';

export async function parseResponse(response: APIResponse): Promise<IResponse> {
  return {
    status: response.status(),
    body: await response.json(),
    url: response.url(),
    headers: response.headers(),
  };
}

export class ServiceApi {
  private baseUrl: string;
  private contextRequest: Promise<APIRequestContext>;

  constructor() {
    this.baseUrl = URLS.base;
    this.contextRequest = this.initialize();
  }

  private async initialize(): Promise<APIRequestContext> {
    return await request.newContext();
  }

  private async getRequest(): Promise<APIRequestContext> {
    if (!this.contextRequest) {
      this.contextRequest = this.initialize();
    }
    return this.contextRequest;
  }

  async login(data: ILoginBody): Promise<IResponse> {
    const request = await this.getRequest();
    const response = await request.post(this.baseUrl + '/api/auth/login', {
      data,
    });
    return parseResponse(response);
  }
}
