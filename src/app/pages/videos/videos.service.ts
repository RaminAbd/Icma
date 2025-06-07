import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApplicationMessageCenterService } from '../../core/services/ApplicationMessageCenter.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GalleryVideosApiService } from '../gallery-videos/shared/services/gallery-videos.api.service';
import { VideosComponent } from './videos.component';
import { GalleryVideosResponseModel } from '../gallery-videos/shared/models/gallery-videos-response.model';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private service: GalleryVideosApiService = inject(GalleryVideosApiService);
  private translate: TranslateService = inject(TranslateService);
  public dialogService: DialogService = inject(DialogService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  component: VideosComponent;

  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        let sorted = structuredClone(resp.data).sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        this.component.videos = structuredClone(sorted).map(
          (video: GalleryVideosResponseModel) => ({
            ...video,
            safeUrl: video.videoUrl ? this.getSafeVideoUrl(video.videoUrl) : '',
            description: this.processDescription(video.description),
          })
        );
        this.component.copy = structuredClone(sorted).map(
          (video: GalleryVideosResponseModel) => ({
            ...video,
            safeUrl: video.videoUrl ? this.getSafeVideoUrl(video.videoUrl) : '',
            description: this.processDescription(video.description),
          })
        );

        console.log(this.component.videos);
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
}
