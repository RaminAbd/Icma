import { Component, inject } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ResourceFilesResponseModel } from '../admin-files/shared/models/resource-files-response.model';
import { HomeService } from './home.service';
import { RouterLink } from '@angular/router';
import {ProgramsResponseModel} from '../admin-programs/shared/models/programs-response.model';
import {GalleryVideosResponseModel} from '../gallery-videos/shared/models/gallery-videos-response.model';
import {EditorialWritersResponseModel} from '../editorial-writers/models/editorial-writers-response.model';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [GalleriaModule, RouterLink, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private service: HomeService = inject(HomeService);
  images = [
    {
      itemImageSrc: 'https://i.ibb.co/qCkd9jS/img1.jpg',
      title: 'Where does it come from?',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      itemImageSrc: 'https://i.ibb.co/NSwVv8D/img3.jpg',
      title: 'Where does it come from?',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      itemImageSrc: 'https://i.ibb.co/jrRb11q/img2.jpg',
      title: 'Where does it come from?',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      itemImageSrc: 'https://i.ibb.co/Bq4Q0M8/img4.jpg',
      title: 'Where does it come from?',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      itemImageSrc: 'https://i.ibb.co/qCkd9jS/img5.jpg',
      title: 'Where does it come from?',
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
  ];
  files: ResourceFilesResponseModel[] = [];
  programs: ProgramsResponseModel[] = [];
  videos: GalleryVideosResponseModel[] = [];
  orgTypes: any[] = [
    { name: 'Community Organizations', value: 1, selected: false, description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
    { name: 'Media', value: 2, selected: false, description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
    { name: 'Foreign Organizations', value: 3, selected: false, description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " },
  ];
  selectedVideo: GalleryVideosResponseModel = new GalleryVideosResponseModel();
  showLightBox: boolean = false;
  writers: EditorialWritersResponseModel[] = [];
  constructor() {
    this.service.component = this;
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
