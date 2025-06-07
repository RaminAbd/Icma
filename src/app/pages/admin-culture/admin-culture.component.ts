import {Component, inject} from '@angular/core';
import {AdminProgramsService} from '../admin-programs/admin-programs.service';
import {ProgramsResponseModel} from '../admin-programs/shared/models/programs-response.model';
import {AdminCultureService} from './admin-culture.service';
import {CultureResponseModel} from './shared/models/culture-response.model';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-culture',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-culture.component.html',
  styleUrl: './admin-culture.component.scss'
})
export class AdminCultureComponent {
  private service: AdminCultureService = inject(AdminCultureService);
  cultures: CultureResponseModel[] = [];
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
