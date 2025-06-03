import {Component, inject} from '@angular/core';
import {
  EditorialUpsertService
} from '../../../../admin-editorials/shared/components/editorial-upsert/editorial-upsert.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {EditorialsRequestModel} from '../../../../admin-editorials/shared/models/editorials-request.model';
import {OrganizationsRequestModel} from '../../models/organizations-request.model';
import {OrganizationsUpsertService} from './organizations-upsert.service';
import {CustomEditorComponent} from '../../../../../components/custom-editor/custom-editor.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {DropdownModule} from 'primeng/dropdown';

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
    DropdownModule
  ],
  templateUrl: './organizations-upsert.component.html',
  styleUrl: './organizations-upsert.component.scss'
})
export class OrganizationsUpsertComponent {
  private service: OrganizationsUpsertService = inject(OrganizationsUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: OrganizationsRequestModel = new OrganizationsRequestModel();
  isSubmitted: boolean = false;
  types:any[]=[
    {name:'Community Organizations', value:1},
    {name:'Media', value:2},
    {name:'Foreign Organizations', value:3},
  ]
  constructor() {
    this.service.component = this;
    this.request = this.config.data;
  }

  save() {
    this.service.save();
  }
}
