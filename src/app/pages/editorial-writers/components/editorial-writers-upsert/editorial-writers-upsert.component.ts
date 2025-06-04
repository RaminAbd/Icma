import {Component, inject} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  EditorialUpsertService
} from '../../../admin-editorials/shared/components/editorial-upsert/editorial-upsert.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {EditorialsRequestModel} from '../../../admin-editorials/shared/models/editorials-request.model';
import {EditorialWritersUpsertService} from './editorial-writers-upsert.service';
import {EditorialWritersRequestModel} from '../../models/editorial-writers-request.model';

@Component({
  selector: 'app-editorial-writers-upsert',
  imports: [
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    NgClass,
    FormsModule,
    NgForOf
  ],
  templateUrl: './editorial-writers-upsert.component.html',
  styleUrl: './editorial-writers-upsert.component.scss'
})
export class EditorialWritersUpsertComponent {
  private service: EditorialWritersUpsertService = inject(EditorialWritersUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: EditorialWritersRequestModel = new EditorialWritersRequestModel();
  isSubmitted: boolean = false;
  constructor() {
    this.service.component = this;
    this.request = this.config.data;
  }

  getWriterFile(e: any) {
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
