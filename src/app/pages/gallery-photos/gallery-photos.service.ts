import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { FileModel } from '../../core/models/File.model';
import { GalleryPhotosComponent } from './gallery-photos.component';
import { GalleryPhotosApiService } from './shared/services/gallery-photos.api.service';
import {PhotoUpsertComponent} from './shared/components/photo-upsert/photo-upsert.component';

@Injectable({
  providedIn: 'root',
})
export class GalleryPhotosService {
  private service: GalleryPhotosApiService = inject(GalleryPhotosApiService);
  private translate: TranslateService = inject(TranslateService);
  public dialogService: DialogService = inject(DialogService);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: GalleryPhotosComponent;

  constructor() {}

  getAll() {
    this.service
      .GetAll(this.service.serviceUrl)
      .subscribe((resp) => {
        let sorted = resp.data.sort(
          (a:any, b:any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        this.component.images = sorted;

      });
  }

  openDialog(data: any) {
    const ref = this.dialogService.open(PhotoUpsertComponent, {
      header: 'Gallery Image',
      width: '500px',
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

  getItem(id: any) {
    this.service.GetById(this.service.serviceUrl, id).subscribe((resp) => {
      if (resp.succeeded) {
        resp.data.title.items.map((x: any) => (x.isValid = true));
        if (!resp.data.image) resp.data.image = new FileModel();
        this.openDialog(resp.data);
      }
    });
  }

  delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showTranslatedSuccessMessage(
          'Successfully deleted category',
        );
        this.getAll();
      }
    });
  }


}
