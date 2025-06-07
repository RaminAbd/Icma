import {inject, Injectable} from '@angular/core';
import {ResourceFilesApiService} from '../admin-files/shared/services/resource-files.api.service';
import {TranslateService} from '@ngx-translate/core';
import {HomeComponent} from './home.component';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private service: ResourceFilesApiService = inject(ResourceFilesApiService);
  private translate: TranslateService = inject(TranslateService);
  constructor() { }
  component:HomeComponent;

  getAllFiles() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.files = structuredClone(resp.data);
      });
  }
}
