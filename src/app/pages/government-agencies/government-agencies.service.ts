import {inject, Injectable} from '@angular/core';
import {AgenciesApiService} from '../admin-agencies/shared/services/agencies.api.service';
import {TranslateService} from '@ngx-translate/core';
import {GovernmentAgenciesComponent} from './government-agencies.component';

@Injectable({
  providedIn: 'root'
})
export class GovernmentAgenciesService {
  private service: AgenciesApiService = inject(AgenciesApiService);
  private translate: TranslateService = inject(TranslateService);
  component: GovernmentAgenciesComponent;
  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.organizations = structuredClone(resp.data);
        this.component.copy = structuredClone(resp.data);
        let item = this.component.types.find(
          (x) => x.value === +this.component.type
        );
        this.component.select(item);
      });
  }
}
