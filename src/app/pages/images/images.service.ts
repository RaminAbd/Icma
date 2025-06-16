import { inject, Injectable } from '@angular/core';
import { GalleryPhotosApiService } from '../gallery-photos/shared/services/gallery-photos.api.service';
import { TranslateService } from '@ngx-translate/core';
import { GalleryPhotosComponent } from '../gallery-photos/gallery-photos.component';
import { ImagesComponent } from './images.component';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private service: GalleryPhotosApiService = inject(GalleryPhotosApiService);
  private translate: TranslateService = inject(TranslateService);
  component: ImagesComponent;
  constructor() {}

  getAll() {
    this.service
      .GetAll(this.service.serviceUrl)
      .subscribe((resp) => {
        let sorted = resp.data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.component.images = sorted;
      });
  }
}
