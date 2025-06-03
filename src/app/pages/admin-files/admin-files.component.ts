import {Component, inject} from '@angular/core';
import {TableComponent} from '../../components/table/table.component';
import {AdminFilesService} from './admin-files.service';
import {ResourceFilesResponseModel} from './shared/models/resource-files-response.model';

@Component({
  selector: 'app-admin-files',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-files.component.html',
  styleUrl: './admin-files.component.scss'
})
export class AdminFilesComponent {
  private service: AdminFilesService = inject(AdminFilesService);
  files: ResourceFilesResponseModel[] = [];
  cols: any[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAll();
    this.service.setCols();
  }

  tableActionHandler(e: any) {
    this.service.tableActionHandler(e);
  }
}
