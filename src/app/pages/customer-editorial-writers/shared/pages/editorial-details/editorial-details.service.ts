import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EditorialDetailsComponent } from './editorial-details.component';
import { EditorialsApiService } from '../../../../admin-editorials/shared/services/editorials.api.service';
import { getTimeAgo } from '../../../../../core/extensions/time-difference';

@Injectable({
  providedIn: 'root',
})
export class EditorialDetailsService {
  private service: EditorialsApiService = inject(EditorialsApiService);
  private translate: TranslateService = inject(TranslateService);
  component: EditorialDetailsComponent;
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
        this.component.response.description =
          this.component.response.description
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
      });
  }
}
