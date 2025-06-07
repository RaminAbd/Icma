import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CultureDetailsComponent } from './culture-details.component';
import { CultureApiService } from '../../../../admin-culture/shared/services/culture.api.service';

@Injectable({
  providedIn: 'root',
})
export class CultureDetailsService {
  private service: CultureApiService = inject(CultureApiService);
  private translate: TranslateService = inject(TranslateService);
  component: CultureDetailsComponent;
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
