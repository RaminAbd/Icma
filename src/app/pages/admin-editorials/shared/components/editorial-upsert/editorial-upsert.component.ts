import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditorialUpsertService } from './editorial-upsert.service';
import { EditorialsRequestModel } from '../../models/editorials-request.model';
import {CustomEditorComponent} from '../../../../../components/custom-editor/custom-editor.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {EditorialWritersResponseModel} from '../../../../editorial-writers/models/editorial-writers-response.model';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'app-editorial-upsert',
  imports: [
    CustomEditorComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    FormsModule,
    NgClass,
    DropdownModule
  ],
  templateUrl: './editorial-upsert.component.html',
  styleUrl: './editorial-upsert.component.scss',
})
export class EditorialUpsertComponent {
  private service: EditorialUpsertService = inject(EditorialUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: EditorialsRequestModel = new EditorialsRequestModel();
  isSubmitted: boolean = false;
  writers: EditorialWritersResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.service.getAllWriters()
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
