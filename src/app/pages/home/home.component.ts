import { Component, inject } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ResourceFilesResponseModel } from '../admin-files/shared/models/resource-files-response.model';
import { HomeService } from './home.service';
import { RouterLink } from '@angular/router';
import { ProgramsResponseModel } from '../admin-programs/shared/models/programs-response.model';
import { GalleryVideosResponseModel } from '../gallery-videos/shared/models/gallery-videos-response.model';
import { EditorialWritersResponseModel } from '../editorial-writers/models/editorial-writers-response.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [GalleriaModule, RouterLink, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private service: HomeService = inject(HomeService);
  images = [];
  files: ResourceFilesResponseModel[] = [];
  programs: ProgramsResponseModel[] = [];
  videos: GalleryVideosResponseModel[] = [];
  orgTypes: any[] = [
    {
      name: 'Media',
      value: 1,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    },
    {
      name: 'İcma təşkilatları',
      value: 2,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    },
    {
      name: 'Mərkəzi təşkilatlar',
      value: 3,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
    },
  ];
  selectedVideo: GalleryVideosResponseModel = new GalleryVideosResponseModel();
  showLightBox: boolean = false;
  writers: EditorialWritersResponseModel[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAllBanners();
    this.service.getAllFiles();
    this.service.getAllPrograms();
    this.service.getAllVideos();
    this.service.getAllWriters();
  }

  openImage(item: any) {
    console.log(item);
    this.selectedVideo = item;
    this.showLightBox = true;
  }

  closeLightbox() {
    this.showLightBox = false;
  }
}
