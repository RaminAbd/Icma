import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JobDetailsComponent } from './job-details.component';
import { WorksApiService } from '../../../../admin-works/shared/services/works.api.service';

@Injectable({
  providedIn: 'root',
})
export class JobDetailsService {
  private service: WorksApiService = inject(WorksApiService);
  private translate: TranslateService = inject(TranslateService);
  component: JobDetailsComponent;
  constructor() {}

  getById() {
    const req = {
      id: this.component.id,
      lang: this.translate.currentLang,
    };
    this.service
      .GetByIdByLang(this.service.serviceUrl, req)
      .subscribe((resp) => {
        this.component.response = resp.data;
        this.component.response.description = resp.data.description
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      });
  }
}
