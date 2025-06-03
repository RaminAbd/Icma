import {Component, inject} from '@angular/core';
import {AdminEditorialsService} from '../admin-editorials/admin-editorials.service';
import {EditorialsResponseModel} from '../admin-editorials/shared/models/editorials-response.model';
import {OrganizationsResponseModel} from './shared/models/organizations-response.model';
import {AdminOrganizationsService} from './admin-organizations.service';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-organizations',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-organizations.component.html',
  styleUrl: './admin-organizations.component.scss'
})
export class AdminOrganizationsComponent {
  private service: AdminOrganizationsService = inject(AdminOrganizationsService);
  organizations: OrganizationsResponseModel[] = [];
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
