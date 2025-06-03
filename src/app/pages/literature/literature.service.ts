import {inject, Injectable} from '@angular/core';
import {ResourceFilesApiService} from '../admin-files/shared/services/resource-files.api.service';
import {TranslateService} from '@ngx-translate/core';
import {LiteratureComponent} from './literature.component';

@Injectable({
  providedIn: 'root'
})
export class LiteratureService {
  private service: ResourceFilesApiService = inject(ResourceFilesApiService);
  private translate: TranslateService = inject(TranslateService);
  component: LiteratureComponent;
  constructor() { }

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.files = structuredClone(resp.data);
        this.component.copy = structuredClone(resp.data);
      });
  }
}
