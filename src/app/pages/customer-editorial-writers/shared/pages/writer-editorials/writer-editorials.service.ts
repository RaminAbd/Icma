import { inject, Injectable } from '@angular/core';
import { EditorialsApiService } from '../../../../admin-editorials/shared/services/editorials.api.service';
import { WriterEditorialsComponent } from './writer-editorials.component';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class WriterEditorialsService {
  private service: EditorialsApiService = inject(EditorialsApiService);
  private translate: TranslateService = inject(TranslateService);
  component: WriterEditorialsComponent;
  constructor() {}
  getAll(){
    const req ={
      writerId:this.component.id,
      lang:this.translate.currentLang
    }
    this.service.GetAllByWriter(req).subscribe(resp=>{
      this.component.editorials=resp.data
    })
  }
}
