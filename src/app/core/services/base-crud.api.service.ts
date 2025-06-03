import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseApiService} from './base.api.service';
import {ApplicationMessageCenterService} from './ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class BaseCrudApiService extends BaseApiService {
  constructor(http: HttpClient, handler: ApplicationMessageCenterService) {
    super(http, handler);
  }

  GetForm(serviceUrl: string) {
    return this.get(serviceUrl + 'getForm', null, null);
  }

  GetAll(serviceUrl: string) {
    return this.get(serviceUrl + 'getAll', null, null);
  }

  GetAllByLang(serviceUrl: string, lang: any) {
    return this.get(serviceUrl + 'getAll/', lang, null);
  }

  Create(serviceUrl: string, form: any) {
    return this.post(serviceUrl + 'create', form);
  }

  Update(serviceUrl: string, form: any) {
    return this.post(serviceUrl + 'update', form);
  }

  GetById(serviceUrl: string, id: string) {
    return this.get(serviceUrl + 'get/', id, null);
  }

  Delete(serviceUrl: string, id: string) {
    return this.delete(serviceUrl + 'delete/', id);
  }

  GetByIdByLang(serviceUrl: string, req: any) {
    return this.get(serviceUrl + 'get/', null, req);
  }

  GetAllWithPaging(serviceUrl: string, req: any) {
    return this.get(serviceUrl + 'getAll', null, req);
  }
}
