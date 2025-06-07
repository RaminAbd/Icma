import {inject, Injectable} from '@angular/core';
import {ProgramsApiService} from '../admin-programs/shared/services/programs.api.service';
import {TranslateService} from '@ngx-translate/core';
import {ProgramsComponent} from '../programs/programs.component';
import {CultureComponent} from './culture.component';
import {CultureApiService} from '../admin-culture/shared/services/culture.api.service';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  private service: CultureApiService = inject(CultureApiService);
  private translate: TranslateService = inject(TranslateService);
  component: CultureComponent;
  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.culture = resp.data.map((item: any) => ({
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
