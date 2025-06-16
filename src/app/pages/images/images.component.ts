import { Component, inject } from '@angular/core';
import { GalleryPhotosService } from '../gallery-photos/gallery-photos.service';
import { GalleryPhotosResponseModel } from '../gallery-photos/shared/models/gallery-photos-response.model';
import { ImagesService } from './images.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-images',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
  ],
  standalone:true,
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss',
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
export class ImagesComponent {
  private service: ImagesService = inject(ImagesService);
  images: GalleryPhotosResponseModel[] = [];
  selectedImage: GalleryPhotosResponseModel = new GalleryPhotosResponseModel();
  showLightBox: boolean = false;
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }

  openImage(item: any) {
    this.selectedImage = item;
    this.showLightBox = true;
  }

  closeLightbox() {
    this.showLightBox = false;
  }
}
