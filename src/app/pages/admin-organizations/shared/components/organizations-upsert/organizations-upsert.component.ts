import { Component, inject } from '@angular/core';
import { EditorialUpsertService } from '../../../../admin-editorials/shared/components/editorial-upsert/editorial-upsert.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditorialsRequestModel } from '../../../../admin-editorials/shared/models/editorials-request.model';
import { OrganizationsRequestModel } from '../../models/organizations-request.model';
import { OrganizationsUpsertService } from './organizations-upsert.service';
import { CustomEditorComponent } from '../../../../../components/custom-editor/custom-editor.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-organizations-upsert',
  imports: [
    CustomEditorComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    NgClass,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './organizations-upsert.component.html',
  styleUrl: './organizations-upsert.component.scss',
})
export class OrganizationsUpsertComponent {
  private service: OrganizationsUpsertService = inject(
    OrganizationsUpsertService
  );
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: OrganizationsRequestModel = new OrganizationsRequestModel();
  isSubmitted: boolean = false;
  types: any[] = [
    { name: 'Media', value: 1 },
    { name: 'İcma təşkilatları', value: 2 },
    { name: 'Mərkəzi təşkilatlar', value: 3 },
    { name: 'Beynəlxalq təşkilatlar', value: 4 },
    { name: 'Proqramlar', value: 5 },
  ];

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
