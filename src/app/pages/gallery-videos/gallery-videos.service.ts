import {inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ApplicationMessageCenterService} from '../../core/services/ApplicationMessageCenter.service';
import {FileModel} from '../../core/models/File.model';
import {GalleryVideosComponent} from './gallery-videos.component';
import {VideoUpsertComponent} from './shared/components/video-upsert/video-upsert.component';
import {GalleryVideosApiService} from './shared/services/gallery-videos.api.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {GalleryVideosResponseModel} from './shared/models/gallery-videos-response.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryVideosService {
  private service: GalleryVideosApiService = inject(GalleryVideosApiService);
  private translate: TranslateService = inject(TranslateService);
  public dialogService: DialogService = inject(DialogService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  public message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService,
  );
  component: GalleryVideosComponent;

  constructor() {}

  getAll() {
    this.service
      .GetAllByLang(this.service.serviceUrl, this.translate.currentLang)
      .subscribe((resp) => {
        let sorted = resp.data.sort(
          (a:any, b:any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        this.component.videos = sorted.map((video: GalleryVideosResponseModel) => ({
          ...video,
          safeUrl:video.videoUrl?this.getSafeVideoUrl(video.videoUrl):''
        }));

        console.log(this.component.videos);
      });
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    const videoId = this.extractVideoId(url);
    if(videoId){
      const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&origin=${window.location.origin}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    else{
      return ''
    }
  }

  extractVideoId(url: string): string {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|live\/|&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  }

  openDialog(data: any) {
    const ref = this.dialogService.open(VideoUpsertComponent, {
      header: 'Gallery Video',
      width: '800px',
      data: data,
      style: {
        maxWidth: '95%',
      },
    });
    ref.onClose.subscribe((e: any) => {
      if (e) {
        this.getAll();
      }
    });
  }

  getItem(id: any) {
    this.service.GetById(this.service.serviceUrl, id).subscribe((resp) => {
      if (resp.succeeded) {
        resp.data.title.items.map((x: any) => (x.isValid = true));
        resp.data.description.items.map((x: any) => (x.isValid = true));
        if (!resp.data.image) resp.data.image = new FileModel();
        this.openDialog(resp.data);
      }
    });
  }

  delete(id: string) {
    this.service.Delete(this.service.serviceUrl, id).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showTranslatedSuccessMessage(
          'Successfully deleted category',
        );
        this.getAll();
      }
    });
  }

  getForm() {
    this.service.GetForm(this.service.serviceUrl).subscribe((resp) => {
      if (resp.succeeded) {
        resp.data.title.items.map((x: any) => (x.isValid = true));
        resp.data.description.items.map((x: any) => (x.isValid = true));
        resp.data.image = new FileModel();
        this.openDialog(resp.data);
      }
    });
  }
}
