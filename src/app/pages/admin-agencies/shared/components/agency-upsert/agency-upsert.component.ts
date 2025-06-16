import {Component, inject} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {OrganizationsRequestModel} from '../../../../admin-organizations/shared/models/organizations-request.model';
import {AgencyUpsertService} from './agency-upsert.service';
import {DropdownModule} from 'primeng/dropdown';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-agency-upsert',
  imports: [
    DropdownModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    FormsModule,
    NgClass
  ],
  templateUrl: './agency-upsert.component.html',
  styleUrl: './agency-upsert.component.scss'
})
export class AgencyUpsertComponent {
  private service: AgencyUpsertService = inject(AgencyUpsertService);
  public config: DynamicDialogConfig = inject(DynamicDialogConfig);
  public ref: DynamicDialogRef = inject(DynamicDialogRef);
  request: OrganizationsRequestModel = new OrganizationsRequestModel();
  isSubmitted: boolean = false;
  types:any[]=[
    {name:'Nazirlik', value:1},
    {name:'Quberniya', value:2},
    {name:'Bələdiyyələr', value:3},
    {name:'Ədliyyə evləri', value:4},
    {name:'Sosial xidmətlər', value:5},
    {name:'Polis', value:6},
    {name:'Başqa', value:7},
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
