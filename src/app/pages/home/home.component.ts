import { Component, inject } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ResourceFilesResponseModel } from '../admin-files/shared/models/resource-files-response.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  imports: [GalleriaModule],
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

  constructor() {
    this.service.component = this;
    this.service.getAllFiles();
  }
}
