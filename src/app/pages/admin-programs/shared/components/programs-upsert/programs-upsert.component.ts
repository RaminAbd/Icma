import {Component, inject} from '@angular/core';
import {CustomEditorComponent} from '../../../../../components/custom-editor/custom-editor.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  EditorialUpsertService
} from '../../../../admin-editorials/shared/components/editorial-upsert/editorial-upsert.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {EditorialsRequestModel} from '../../../../admin-editorials/shared/models/editorials-request.model';
import {ProgramsUpsertService} from './programs-upsert.service';
import {ProgramsRequestModel} from '../../models/programs-request.model';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-programs-upsert',
  imports: [
    CustomEditorComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    FormsModule,
    NgClass,
    DatePicker
  ],
  templateUrl: './programs-upsert.component.html',
  styleUrl: './programs-upsert.component.scss'
})
export class ProgramsUpsertComponent {
  private service: ProgramsUpsertService = inject(ProgramsUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: ProgramsRequestModel = new ProgramsRequestModel();
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
