import { Component, inject } from '@angular/core';
import { GalleryPhotosService } from './gallery-photos.service';
import { GalleryPhotosResponseModel } from './shared/models/gallery-photos-response.model';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { Popover } from 'primeng/popover';
import { animate, style, transition, trigger } from '@angular/animations';
import {GalleryPhotosRequestModel} from './shared/models/gallery-photos-request.model';

@Component({
  selector: 'app-gallery-photos',
  imports: [NgForOf, Popover, NgIf, DatePipe],
  templateUrl: './gallery-photos.component.html',
  styleUrl: './gallery-photos.component.scss',
  animations: [
    trigger('zoomInOut', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate('300ms ease-in-out', style({ transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({ transform: 'scale(0.5)' })),
      ]),
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class GalleryPhotosComponent {
  private service: GalleryPhotosService = inject(GalleryPhotosService);
  images: GalleryPhotosResponseModel[] = [];
  selectedItem: GalleryPhotosResponseModel = new GalleryPhotosResponseModel();
  selectedImage: GalleryPhotosResponseModel = new GalleryPhotosResponseModel();
  showLightBox: boolean = false;
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }

  openToolbar(item: GalleryPhotosResponseModel) {
    this.selectedItem = structuredClone(item);
  }

  create() {
    this.service.openDialog(new GalleryPhotosRequestModel());
  }

  delete() {
    this.service.delete(this.selectedItem.id);
  }

  edit() {
    this.service.getItem(this.selectedItem.id);
  }

  openImage(item: any) {
    this.selectedImage = item;
    this.showLightBox = true;
  }

  closeLightbox() {
    this.showLightBox = false;
  }
}
