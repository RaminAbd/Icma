import {inject, Injectable} from '@angular/core';
import {ApplicationMessageCenterService} from '../../../../../core/services/ApplicationMessageCenter.service';
import {BlobService} from '../../../../../core/services/blob.service';
import {ResourceFilesUpsertComponent} from './resource-files-upsert.component';
import {ResourceFilesApiService} from '../../services/resource-files.api.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceFilesUpsertService {
  component: ResourceFilesUpsertComponent;
  private service: ResourceFilesApiService = inject(ResourceFilesApiService);
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
    this.component.request.description.items.forEach((item) => {
      if (!item.value) {
        result = false;
        item.isValid = false;
      } else {
        item.isValid = true;
      }
    });

    if (
      !this.component.request.image.fileUrl ||
      !this.component.request.resourceType ||
      !this.component.request.pdf.fileUrl
    ) {
      result = false;
    }

    return result;
  }
}
