import { inject, Injectable } from '@angular/core';
import { ProgramsApiService } from '../admin-programs/shared/services/programs.api.service';
import { TranslateService } from '@ngx-translate/core';
import { ProgramsComponent } from './programs.component';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  private service: ProgramsApiService = inject(ProgramsApiService);
  private translate: TranslateService = inject(TranslateService);
  component: ProgramsComponent;
  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.programs = resp.data.map((item: any) => ({
          ...item,
          description: this.processDescription(item.description),
        }));
      });
  }

  processDescription(description: any) {
    const plainText = this.stripHtml(description);
    if (plainText.length > 160) {
      const truncatedText = plainText.slice(0, 160) + '...';
      return `${truncatedText}`;
    } else {
      return description;
    }
  }

  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
}
