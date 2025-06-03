import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ApplicationMessageCenterService} from '../../core/services/ApplicationMessageCenter.service';
import {FileModel} from '../../core/models/File.model';
import {ResourceFilesApiService} from './shared/services/resource-files.api.service';
import {AdminFilesComponent} from './admin-files.component';
import {ResourceFilesUpsertComponent} from './shared/components/resource-files-upsert/resource-files-upsert.component';

@Injectable({
  providedIn: 'root'
})
export class AdminFilesService {
  private service: ResourceFilesApiService = inject(ResourceFilesApiService);
  private translate: TranslateService = inject(TranslateService);
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: AdminFilesComponent;

  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.files = resp.data;
      });
  }

  tableActionHandler(e: any) {
    switch (e.type) {
      case 1:
        this.getForm();
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
      { field: 'description', header: 'Description' },
      { field: 'crudActions', header: 'Actions' },
    ];
  }

  openDialog(data: any) {
    const ref = this.dialogService.open(ResourceFilesUpsertComponent, {
      header: 'Literature',
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
        resp.data.description.items.map((x: any) => (x.isValid = true));
        if (!resp.data.image) resp.data.image = new FileModel();
        if (!resp.data.pdf) resp.data.pdf = new FileModel();
        this.openDialog(resp.data);
      }
    });
  }

  private delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showTranslatedSuccessMessage(
          'Successfully deleted',
        );
        this.getAll();
      }
    });
  }

  private getForm() {
    this.service.GetForm(this.service.serviceUrl).subscribe((resp) => {
      if (resp.succeeded) {
        resp.data.description.items.map((x: any) => (x.isValid = true));
        if (!resp.data.image) resp.data.image = new FileModel();
        if (!resp.data.pdf) resp.data.pdf = new FileModel();
        this.openDialog(resp.data);
      }
    });
  }
}
