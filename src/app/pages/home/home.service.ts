import { inject, Injectable } from '@angular/core';
import { ResourceFilesApiService } from '../admin-files/shared/services/resource-files.api.service';
import { TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { ProgramsApiService } from '../admin-programs/shared/services/programs.api.service';
import { GalleryVideosApiService } from '../gallery-videos/shared/services/gallery-videos.api.service';
import { GalleryVideosResponseModel } from '../gallery-videos/shared/models/gallery-videos-response.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EditorialWritersApiService } from '../editorial-writers/services/editorial-writers.api.service';
import {BannersApiService} from '../admin-banner/shared/services/banners.api.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private service: ResourceFilesApiService = inject(ResourceFilesApiService);
  private bannersService: BannersApiService = inject(BannersApiService);
  private translate: TranslateService = inject(TranslateService);
  private prService: ProgramsApiService = inject(ProgramsApiService);
  private videosService: GalleryVideosApiService = inject(
    GalleryVideosApiService
  );
  private writersService: EditorialWritersApiService = inject(
    EditorialWritersApiService
  );
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  constructor() {}
  component: HomeComponent;

  getAllBanners() {
    this.bannersService
      .GetAllByLang(this.bannersService.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.images = structuredClone(resp.data).splice(0, 5);
      });
  }

  getAllFiles() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.files = structuredClone(resp.data).splice(0, 5);
        console.log(this.component.files);
      });
  }

  getAllPrograms() {
    this.prService
      .GetAllByLang(this.prService.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.programs = resp.data
          .map((item: any) => ({
            ...item,
            description: this.processDescription(item.description),
          }))
          .splice(0, 3);
        console.log(this.component.programs, 'programs');
      });
  }

  processDescription(description: any) {
    const plainText = this.stripHtml(description);
    if (plainText.length > 160) {
      const truncatedText = plainText.slice(0, 160) + '...';
      return `${truncatedText}`;
    } else {
      return description;
    }
  }

  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  getAllVideos() {
    this.videosService
      .GetAllByLang(this.videosService.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        let sorted = structuredClone(resp.data).sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.component.videos = structuredClone(sorted)
          .map((video: GalleryVideosResponseModel) => ({
            ...video,
            safeUrl: video.videoUrl ? this.getSafeVideoUrl(video.videoUrl) : '',
            description: this.processDescription(video.description),
          }))
          .splice(0, 4);
      });
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    const videoId = this.extractVideoId(url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&origin=${window.location.origin}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      return '';
    }
  }

  extractVideoId(url: string): string {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|live\/|&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }

  getAllWriters() {
    this.writersService
      .GetAllByLang(this.writersService.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        this.component.writers = resp.data.splice(0, 5);
      });
  }
}
