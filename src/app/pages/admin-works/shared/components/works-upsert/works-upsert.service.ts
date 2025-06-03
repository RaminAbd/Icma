import {inject, Injectable} from '@angular/core';
import {
  EditorialUpsertComponent
} from '../../../../admin-editorials/shared/components/editorial-upsert/editorial-upsert.component';
import {EditorialsApiService} from '../../../../admin-editorials/shared/services/editorials.api.service';
import {ApplicationMessageCenterService} from '../../../../../core/services/ApplicationMessageCenter.service';
import {BlobService} from '../../../../../core/services/blob.service';
import {WorksUpsertComponent} from './works-upsert.component';
import {WorksApiService} from '../../services/works.api.service';

@Injectable({
  providedIn: 'root'
})
export class WorksUpsertService {
  component: WorksUpsertComponent;
  private service: WorksApiService = inject(WorksApiService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  private blob: BlobService = inject(BlobService);
  constructor() {}

  getFile(e: any, fileHandler: any) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append('file', files[i]);
      this.blob.UploadFile(fd).subscribe((resp: any) => {
        fileHandler(resp);
      });
    }
  }

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
    this.component.request.title.items.forEach((item) => {
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
      !this.component.request.image.fileUrl
    ) {
      result = false;
    }

    return result;
  }
}
