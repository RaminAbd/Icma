import {inject, Injectable} from '@angular/core';
import {
  EditorialUpsertComponent
} from '../../../../admin-editorials/shared/components/editorial-upsert/editorial-upsert.component';
import {EditorialsApiService} from '../../../../admin-editorials/shared/services/editorials.api.service';
import {ApplicationMessageCenterService} from '../../../../../core/services/ApplicationMessageCenter.service';
import {BlobService} from '../../../../../core/services/blob.service';
import {OrganizationsUpsertComponent} from './organizations-upsert.component';
import {OrganizationsApiService} from '../../services/organizations.api.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsUpsertService {
  component: OrganizationsUpsertComponent;
  private service: OrganizationsApiService = inject(OrganizationsApiService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private blob: BlobService = inject(BlobService);
  constructor() {}


  save() {
    this.component.isSubmitted = true;
    if (this.isValid()) {
      if (this.component.request.id) {
        this.update();
      } else {
        this.create();
      }
    } else {
      this.message.showTranslatedWarningMessage('Fields are not valid!');
    }
  }

  private update() {
    this.service
      .Update(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.message.showTranslatedSuccessMessage('Created successfully!');
          this.component.ref.close(true);
        }
      });
  }

  private create() {
    this.service
      .Create(this.service.serviceUrl, this.component.request)
      .subscribe((resp) => {
        if (resp.succeeded) {
          this.message.showTranslatedSuccessMessage('Created successfully!');
          this.component.ref.close(true);
        }
      });
  }

  private isValid() {
    let result = true;
    this.component.request.name.items.forEach((item) => {
      if (!item.value) {
        result = false;
        item.isValid = false;
      } else {
        item.isValid = true;
      }
    });
    this.component.request.description.items.forEach((item) => {
      if (!item.value) {
        result = false;
        item.isValid = false;
      } else {
        item.isValid = true;
      }
    });

    if (
      !this.component.request.phoneNumber ||
      !this.component.request.link ||
      !this.component.request.resourceType
    ) {
      result = false;
    }

    return result;
  }
}
