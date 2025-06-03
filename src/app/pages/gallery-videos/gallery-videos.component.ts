import {Component, inject} from '@angular/core';
import {GalleryPhotosService} from '../gallery-photos/gallery-photos.service';
import {GalleryPhotosResponseModel} from '../gallery-photos/shared/models/gallery-photos-response.model';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Popover} from 'primeng/popover';
import {GalleryVideosService} from './gallery-videos.service';
import {GalleryVideosResponseModel} from './shared/models/gallery-videos-response.model';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-gallery-videos',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    Popover
  ],
  templateUrl: './gallery-videos.component.html',
  styleUrl: './gallery-videos.component.scss',
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
export class GalleryVideosComponent {
  private service: GalleryVideosService = inject(GalleryVideosService);
  videos: GalleryVideosResponseModel[] = [];
  selectedItem: GalleryVideosResponseModel = new GalleryVideosResponseModel();
  selectedVideo: GalleryVideosResponseModel = new GalleryVideosResponseModel();
  showLightBox: boolean = false;
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }

  openToolbar(item: GalleryVideosResponseModel) {
    this.selectedItem = structuredClone(item);
  }

  create() {
    this.service.getForm();
  }

  delete() {
    this.service.delete(this.selectedItem.id);
  }

  edit() {
    this.service.getItem(this.selectedItem.id);
  }

  openImage(item: any) {
    console.log(item)
    this.selectedVideo = item;
    this.showLightBox = true;
  }

  closeLightbox() {
    this.showLightBox = false;
  }
}
