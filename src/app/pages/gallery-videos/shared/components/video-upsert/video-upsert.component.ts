import {Component, inject} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {VideoUpsertService} from './video-upsert.service';
import {GalleryVideosRequestModel} from '../../models/gallery-videos-request.model';
import {CustomEditorComponent} from "../../../../../components/custom-editor/custom-editor.component";
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-video-upsert',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    TranslatePipe,
    NgClass,
    CustomEditorComponent,
    DropdownModule
  ],
  templateUrl: './video-upsert.component.html',
  styleUrl: './video-upsert.component.scss'
})
export class VideoUpsertComponent {
  private service: VideoUpsertService = inject(VideoUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: GalleryVideosRequestModel = new GalleryVideosRequestModel();
  isSubmitted: boolean = false;
  types:any[]=[
    {name:'Reportage', value:1},
    {name:'Program', value:2},
  ]
  constructor() {
    this.service.component = this;
    this.request = this.config.data;
  }
  getFile(e: any) {
    this.request.image.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.image.fileLoading = false;
      this.request.image = resp.data;
      this.request.image.fakeFile = null;
      this.request.image.isValid = true;
    });
  }

  getFileName(fileName: string): string {
    if (fileName) {
      if (fileName.length > 30) {
        return this.changeFileName(fileName);
      } else {
        return fileName;
      }
    } else {
      return '';
    }
  }

  changeFileName(name: string) {
    return (
      name.substring(0, 10) +
      '...' +
      name.substring(name.length - 5, name.length)
    );
  }

  save() {
    this.service.save();
  }
}
