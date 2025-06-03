import {Component, inject} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ResourceFilesUpsertService} from './resource-files-upsert.service';
import {ResourceFilesRequestModel} from '../../models/resource-files-request.model';
import {CustomEditorComponent} from '../../../../../components/custom-editor/custom-editor.component';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-resource-files-upsert',
  imports: [
    CustomEditorComponent,
    DropdownModule,
    FormsModule,
    NgForOf,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './resource-files-upsert.component.html',
  styleUrl: './resource-files-upsert.component.scss'
})
export class ResourceFilesUpsertComponent {
  private service: ResourceFilesUpsertService = inject(ResourceFilesUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: ResourceFilesRequestModel = new ResourceFilesRequestModel();
  isSubmitted: boolean = false;
  types:any[]=[
    {name:'General', value:1},
    {name:'Government', value:2},
    {name:'Ministries', value:3},
    {name:'Governorate', value:4},
    {name:'Municipalities', value:5},
    {name:'Social Services', value:6},
    {name:'Laws', value:7},
    {name:'Library', value:8},
    {name:'EU (European Union)', value:9},
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

  getPDF(e: any) {
    this.request.pdf.fileLoading = true;
    this.service.getFile(e, (resp: any) => {
      this.request.pdf.fileLoading = false;
      this.request.pdf = resp.data;
      this.request.pdf.fakeFile = null;
      this.request.pdf.isValid = true;
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
