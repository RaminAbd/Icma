import {Component, inject} from '@angular/core';
import {AdminProgramsService} from './admin-programs.service';
import {ProgramsResponseModel} from './shared/models/programs-response.model';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-programs',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-programs.component.html',
  styleUrl: './admin-programs.component.scss'
})
export class AdminProgramsComponent {
  private service: AdminProgramsService = inject(AdminProgramsService);
  programs: ProgramsResponseModel[] = [];
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
