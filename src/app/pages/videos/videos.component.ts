import { Component, inject } from '@angular/core';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { GalleryVideosResponseModel } from '../gallery-videos/shared/models/gallery-videos-response.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { VideosService } from './videos.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-videos',
  imports: [DatePipe, NgForOf, NgIf, NgClass, TranslatePipe],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
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
export class VideosComponent {
  private service: VideosService = inject(VideosService);
  videos: GalleryVideosResponseModel[] = [];
  copy: GalleryVideosResponseModel[] = [];
  selectedItem: GalleryVideosResponseModel = new GalleryVideosResponseModel();
  selectedVideo: GalleryVideosResponseModel = new GalleryVideosResponseModel();
  showLightBox: boolean = false;
  types: any[] = [
    { name: 'All', value: 0, selected: true },
    { name: 'Reportage', value: 1, selected: false },
    { name: 'Veriliş', value: 2, selected: false },
  ];
  showMobMenu:boolean = false;

  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.checkWindowSize()
    window.addEventListener('resize', () => {
      this.checkWindowSize();
    });
  }
  isMobile:boolean = false;
  checkWindowSize(){
    this.isMobile = window.innerWidth <= 769;
  }

  openImage(item: any) {
    console.log(item);
    this.selectedVideo = item;
    this.showLightBox = true;
  }

  closeLightbox() {
    this.showLightBox = false;
  }

  select(item: any) {
    console.log(item, this.copy);
    let deepCopy = structuredClone(this.copy).map((item) => ({
      ...item,
      safeUrl: this.service.getSafeVideoUrl(item.videoUrl),
    }));
    this.types.forEach((type) => {
      type.selected = false;
      if (item.value !== type.value) {
        if (type.children) {
          type.children.forEach((type: any) => (type.selected = false));
        }
      }
    });
    item.selected = true;
    if (item.value === 0) {
      this.videos = deepCopy;
    } else {
      this.videos = deepCopy.filter((file) => file.resourceType === item.value);
    }
  }
}
