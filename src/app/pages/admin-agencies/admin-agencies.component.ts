import {Component, inject} from '@angular/core';
import {OrganizationsResponseModel} from '../admin-organizations/shared/models/organizations-response.model';
import {AdminAgenciesService} from './admin-agencies.service';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-agencies',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-agencies.component.html',
  styleUrl: './admin-agencies.component.scss'
})
export class AdminAgenciesComponent {
  private service: AdminAgenciesService = inject(AdminAgenciesService);
  agencies: OrganizationsResponseModel[] = [];
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
