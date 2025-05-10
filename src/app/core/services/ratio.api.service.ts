import { Injectable } from '@angular/core';
import {BaseCrudApiService} from './base-crud.api.service';
import {HttpClient} from '@angular/common/http';
import {ApplicationMessageCenterService} from './ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root'
})
export class RatioApiService extends BaseCrudApiService {
  ServiceUrl: string = 'v1/Ratio/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  getRatio(){
    return this.get(this.ServiceUrl + 'GetRatio/', null, null);
  }
}
