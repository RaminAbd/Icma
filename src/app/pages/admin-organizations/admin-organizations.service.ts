import {inject, Injectable} from '@angular/core';
import {EditorialsApiService} from '../admin-editorials/shared/services/editorials.api.service';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ApplicationMessageCenterService} from '../../core/services/ApplicationMessageCenter.service';
import {AdminEditorialsComponent} from '../admin-editorials/admin-editorials.component';
import {
  EditorialUpsertComponent
} from '../admin-editorials/shared/components/editorial-upsert/editorial-upsert.component';
import {FileModel} from '../../core/models/File.model';
import {AdminOrganizationsComponent} from './admin-organizations.component';
import {OrganizationsApiService} from './shared/services/organizations.api.service';
import {OrganizationsUpsertComponent} from './shared/components/organizations-upsert/organizations-upsert.component';

@Injectable({
  providedIn: 'root'
})
export class AdminOrganizationsService {
  private service: OrganizationsApiService = inject(OrganizationsApiService);
  private translate: TranslateService = inject(TranslateService);
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: AdminOrganizationsComponent;

  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.organizations = resp.data;
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
    const ref = this.dialogService.open(OrganizationsUpsertComponent, {
      header: 'Organization',
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
        resp.data.name.items.map((x: any) => (x.isValid = true));
        resp.data.description.items.map((x: any) => (x.isValid = true));

        this.openDialog(resp.data);
      }
    });
  }
}
