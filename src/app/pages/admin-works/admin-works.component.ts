import {Component, inject} from '@angular/core';
import {AdminWorksService} from './admin-works.service';
import {WorksResponseModel} from './shared/models/works-response.model';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-works',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-works.component.html',
  styleUrl: './admin-works.component.scss'
})
export class AdminWorksComponent {
  private service: AdminWorksService = inject(AdminWorksService);
  works: WorksResponseModel[] = [];
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
