import {Component, inject} from '@angular/core';
import {EditorialWritersService} from './editorial-writers.service';
import {EditorialWritersResponseModel} from './models/editorial-writers-response.model';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-editorial-writers',
  imports: [
    TableComponent
  ],
  templateUrl: './editorial-writers.component.html',
  styleUrl: './editorial-writers.component.scss'
})
export class EditorialWritersComponent {
  private service: EditorialWritersService = inject(EditorialWritersService);
  writers: EditorialWritersResponseModel[] = [];
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
