import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  constructor(private translate: TranslateService) {}
  registerLanguages() {
    this.translate.addLangs(['az-Aze']);
    const langExists: boolean = !!localStorage.getItem('systemLanguage');
    if (!langExists) {
      this.translate.setDefaultLang('az-Aze');
      localStorage.setItem('systemLanguage', 'az-Aze');
      this.translate.use('az-Aze');
    } else {
      const value: string = localStorage.getItem('systemLanguage') as string;
      this.translate.setDefaultLang(value);
      this.translate.use(value);
    }
  }
}
