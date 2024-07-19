import { URLS } from '@data/urls.data';
import { ILoginBody, IResponse } from '@interfaces/ICommon';
import { APIRequestContext, request } from '@playwright/test';
import { parseResponse } from '../index';

export class ServiceApi {
  private baseUrl = URLS.base;
  private contextRequest = this.initialize();

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
