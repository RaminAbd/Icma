import { inject, Injectable } from '@angular/core';
import { EditorialsApiService } from '../admin-editorials/shared/services/editorials.api.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { AdminEditorialsComponent } from '../admin-editorials/admin-editorials.component';
import { EditorialUpsertComponent } from '../admin-editorials/shared/components/editorial-upsert/editorial-upsert.component';
import { FileModel } from '../../core/models/File.model';
import { EditorialWritersApiService } from './services/editorial-writers.api.service';
import { EditorialWritersComponent } from './editorial-writers.component';
import { EditorialWritersUpsertComponent } from './components/editorial-writers-upsert/editorial-writers-upsert.component';
import {EditorialWritersRequestModel} from './models/editorial-writers-request.model';

@Injectable({
  providedIn: 'root',
})
export class EditorialWritersService {
  private service: EditorialWritersApiService = inject(
    EditorialWritersApiService,
  );
  private translate: TranslateService = inject(TranslateService);
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: EditorialWritersComponent;

  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.writers = resp.data;
      });
  }

  tableActionHandler(e: any) {
    switch (e.type) {
      case 1:
        this.getForm()
        break;
      case 2:
        this.getItem(e.data.id);
        break;
      case 3:
        this.delete(e.data.id);
        break;
    }
  }

  setCols() {
    this.component.cols = [
      { field: 'name', header: 'Writer' },
      { field: 'crudActions', header: 'Actions' },
    ];
  }

  openDialog(data: any) {
    const ref = this.dialogService.open(EditorialWritersUpsertComponent, {
      header: 'Writer',
      width: '700px',
      data: data,
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        this.getAll();
      }
    });
  }

  private getItem(id: any) {
    this.service.GetById(this.service.serviceUrl, id).subscribe((resp) => {
      if (resp.succeeded) {
        if (!resp.data.image) resp.data.image = new FileModel();
        resp.data.biography.items.map((x: any) => (x.isValid = true));
        this.openDialog(resp.data);
      }
    });
  }

  private delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showTranslatedSuccessMessage('Successfully deleted');
        this.getAll();
      }
    });
  }

  private getForm() {
    this.service.GetForm(this.service.serviceUrl).subscribe((resp) => {
      if (resp.succeeded) {
        if (!resp.data.image) resp.data.image = new FileModel();
        resp.data.biography.items.map((x: any) => (x.isValid = true));
        this.openDialog(resp.data);
      }
    })
  }
}
