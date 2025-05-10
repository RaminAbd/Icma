import { Component, inject } from '@angular/core';
import { AdminEditorialsService } from './admin-editorials.service';
import { EditorialsResponseModel } from './shared/models/editorials-response.model';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-editorials',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-editorials.component.html',
  styleUrl: './admin-editorials.component.scss',
})
export class AdminEditorialsComponent {
  private service: AdminEditorialsService = inject(AdminEditorialsService);
  editorials: EditorialsResponseModel[] = [];
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
