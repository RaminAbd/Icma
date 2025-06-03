import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ApplicationMessageCenterService} from '../../core/services/ApplicationMessageCenter.service';
import {FileModel} from '../../core/models/File.model';
import {ProgramsUpsertComponent} from './shared/components/programs-upsert/programs-upsert.component';
import {AdminProgramsComponent} from './admin-programs.component';
import {ProgramsApiService} from './shared/services/programs.api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminProgramsService {
  private service: ProgramsApiService = inject(ProgramsApiService);
  private translate: TranslateService = inject(TranslateService);
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: AdminProgramsComponent;

  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.programs = resp.data;
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
      { field: 'title', header: 'Title' },
      { field: 'crudActions', header: 'Actions' },
    ];
  }

  openDialog(data: any) {
    const ref = this.dialogService.open(ProgramsUpsertComponent, {
      header: 'Program',
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
        resp.data.title.items.map((x: any) => (x.isValid = true));
        resp.data.description.items.map((x: any) => (x.isValid = true));
        if (!resp.data.image) resp.data.image = new FileModel();
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
        resp.data.title.items.map((x: any) => (x.isValid = true));
        resp.data.description.items.map((x: any) => (x.isValid = true));
        resp.data.image = new FileModel();
        this.openDialog(resp.data);
      }
    });
  }
}
