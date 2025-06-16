import { inject, Injectable } from '@angular/core';
import { EditorialWritersUpsertComponent } from '../../../../editorial-writers/components/editorial-writers-upsert/editorial-writers-upsert.component';
import { EditorialWritersApiService } from '../../../../editorial-writers/services/editorial-writers.api.service';
import { ApplicationMessageCenterService } from '../../../../../core/services/ApplicationMessageCenter.service';
import { BlobService } from '../../../../../core/services/blob.service';
import { BannersApiService } from '../../services/banners.api.service';
import { BannerUpsertComponent } from './banner-upsert.component';

@Injectable({
  providedIn: 'root',
})
export class BannerUpsertService {
  component: BannerUpsertComponent;
  private service: BannersApiService = inject(BannersApiService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
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
    this.component.request.name.items.forEach((item) => {
      if (!item.value) {
        result = false;
        item.isValid = false;
      } else {
        item.isValid = true;
      }
    });

    if (!this.component.request.image.fileUrl) {
      result = false;
    }

    return result;
  }
}
