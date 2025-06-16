import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ApplicationMessageCenterService} from '../../core/services/ApplicationMessageCenter.service';
import {FileModel} from '../../core/models/File.model';
import {AdminAgenciesComponent} from './admin-agencies.component';
import {AgenciesApiService} from './shared/services/agencies.api.service';
import {AgencyUpsertComponent} from './shared/components/agency-upsert/agency-upsert.component';

@Injectable({
  providedIn: 'root'
})
export class AdminAgenciesService {
  private service: AgenciesApiService = inject(AgenciesApiService);
  private translate: TranslateService = inject(TranslateService);
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: AdminAgenciesComponent;

  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.agencies = resp.data;
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
      { field: 'name', header: 'Name' },
      { field: 'phoneNumber', header: 'Phone number' },
      { field: 'crudActions', header: 'Actions' },
    ];
  }

  openDialog(data: any) {
    const ref = this.dialogService.open(AgencyUpsertComponent, {
      header: 'Agency',
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
        resp.data.name.items.map((x: any) => (x.isValid = true));
        resp.data.description.items.map((x: any) => (x.isValid = true));
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
        resp.data.image = new FileModel();
        resp.data.name.items.map((x: any) => (x.isValid = true));
        resp.data.description.items.map((x: any) => (x.isValid = true));

        this.openDialog(resp.data);
      }
    });
  }
}
