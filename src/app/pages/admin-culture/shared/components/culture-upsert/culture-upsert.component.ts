import {Component, inject} from '@angular/core';
import {
  ProgramsUpsertService
} from '../../../../admin-programs/shared/components/programs-upsert/programs-upsert.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ProgramsRequestModel} from '../../../../admin-programs/shared/models/programs-request.model';
import {CultureUpsertService} from './culture-upsert.service';
import {CultureRequestModel} from '../../models/culture-request.model';
import {CustomEditorComponent} from '../../../../../components/custom-editor/custom-editor.component';
import {DatePicker} from 'primeng/datepicker';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-culture-upsert',
  imports: [
    CustomEditorComponent,
    DatePicker,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    NgClass,
    FormsModule
  ],
  templateUrl: './culture-upsert.component.html',
  styleUrl: './culture-upsert.component.scss'
})
export class CultureUpsertComponent {
  private service: CultureUpsertService = inject(CultureUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: CultureRequestModel = new CultureRequestModel();
  isSubmitted: boolean = false;
  date:any;
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
