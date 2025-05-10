import { Injectable } from '@angular/core';
import { BaseCrudApiService } from './base-crud.api.service';
import { HttpClient } from '@angular/common/http';
import { ApplicationMessageCenterService } from './ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class NewslettersApiService extends BaseCrudApiService {
  ServiceUrl: string = 'v1/Newsletters/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  Subscribe(req: any) {
    return this.post(this.ServiceUrl + 'Subscribe', req);
  }
}
