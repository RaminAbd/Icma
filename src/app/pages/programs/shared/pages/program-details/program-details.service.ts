import { inject, Injectable } from '@angular/core';
import { ProgramsApiService } from '../../../../admin-programs/shared/services/programs.api.service';
import { TranslateService } from '@ngx-translate/core';
import { ProgramDetailsComponent } from './program-details.component';

@Injectable({
  providedIn: 'root',
})
export class ProgramDetailsService {
  private service: ProgramsApiService = inject(ProgramsApiService);
  private translate: TranslateService = inject(TranslateService);
  component: ProgramDetailsComponent;
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
