import {Component, inject} from '@angular/core';
import {
  EditorialWritersUpsertService
} from '../../../../editorial-writers/components/editorial-writers-upsert/editorial-writers-upsert.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {EditorialWritersRequestModel} from '../../../../editorial-writers/models/editorial-writers-request.model';
import {BannerUpsertService} from './banner-upsert.service';
import {BannersRequestModel} from '../../models/banners-request.model';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-banner-upsert',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    NgClass,
    FormsModule
  ],
  templateUrl: './banner-upsert.component.html',
  styleUrl: './banner-upsert.component.scss'
})
export class BannerUpsertComponent {
  private service: BannerUpsertService = inject(BannerUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: BannersRequestModel = new BannersRequestModel();
  isSubmitted: boolean = false;
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
