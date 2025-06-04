import { inject, Injectable } from '@angular/core';
import { EditorialWritersApiService } from '../editorial-writers/services/editorial-writers.api.service';
import { TranslateService } from '@ngx-translate/core';
import { CustomerEditorialWritersComponent } from './customer-editorial-writers.component';

@Injectable({
  providedIn: 'root',
})
export class CustomerEditorialWritersService {
  private service: EditorialWritersApiService = inject(
    EditorialWritersApiService,
  );
  private translate: TranslateService = inject(TranslateService);
  component: CustomerEditorialWritersComponent;
  constructor() {}

  getAll() {
    this.service.GetAllByLang(this.service.serviceUrl, this.translate.currentLang).subscribe((resp) => {
      console.log(resp.data);
      this.component.writers = resp.data;
    });
  }
}
