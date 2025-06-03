import {inject, Injectable} from '@angular/core';
import {OrganizationsApiService} from '../admin-organizations/shared/services/organizations.api.service';
import {TranslateService} from '@ngx-translate/core';
import {OrganizationsComponent} from './organizations.component';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  private service: OrganizationsApiService = inject(OrganizationsApiService);
  private translate: TranslateService = inject(TranslateService);
  component:OrganizationsComponent;
  constructor() { }

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.organizations = structuredClone(resp.data);
        this.component.copy = structuredClone(resp.data);
      });
  }
}
