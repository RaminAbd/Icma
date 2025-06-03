import {Component, inject} from '@angular/core';
import {CustomEditorComponent} from '../../../../../components/custom-editor/custom-editor.component';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {
  EditorialUpsertService
} from '../../../../admin-editorials/shared/components/editorial-upsert/editorial-upsert.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {EditorialsRequestModel} from '../../../../admin-editorials/shared/models/editorials-request.model';
import {WorksUpsertService} from './works-upsert.service';
import {WorksRequestModel} from '../../models/works-request.model';

@Component({
  selector: 'app-works-upsert',
  imports: [
    CustomEditorComponent,
    FormsModule,
    NgForOf,
    NgIf,
    TranslatePipe,
    NgClass
  ],
  templateUrl: './works-upsert.component.html',
  styleUrl: './works-upsert.component.scss'
})
export class WorksUpsertComponent {
  private service: WorksUpsertService = inject(WorksUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: WorksRequestModel = new WorksRequestModel();
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
