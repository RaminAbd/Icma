import {Component, inject} from '@angular/core';
import {EditorialWritersService} from '../editorial-writers/editorial-writers.service';
import {EditorialWritersResponseModel} from '../editorial-writers/models/editorial-writers-response.model';
import {AdminBannerService} from './admin-banner.service';
import {BannersResponseModel} from './shared/models/banners-response.model';
import {TableComponent} from '../../components/table/table.component';

@Component({
  selector: 'app-admin-banner',
  imports: [
    TableComponent
  ],
  templateUrl: './admin-banner.component.html',
  styleUrl: './admin-banner.component.scss'
})
export class AdminBannerComponent {
  private service: AdminBannerService = inject(AdminBannerService);
  banners: BannersResponseModel[] = [];
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
