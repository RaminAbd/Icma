import { Injectable } from '@angular/core';
import {BaseCrudApiService} from '../../../../core/services/base-crud.api.service';
import {HttpClient} from '@angular/common/http';
import {ApplicationMessageCenterService} from '../../../../core/services/ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root'
})
export class EditorialsApiService  extends BaseCrudApiService {
  serviceUrl = 'Editorials/';
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  GetAllByWriter(req:any){
    return this.get(this.serviceUrl+'GetAllByWriter', null, req)
  }
}
