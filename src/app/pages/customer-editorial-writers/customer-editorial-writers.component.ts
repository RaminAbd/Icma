import {Component, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {EditorialWritersResponseModel} from '../editorial-writers/models/editorial-writers-response.model';
import {CustomerEditorialWritersService} from './customer-editorial-writers.service';

@Component({
  selector: 'app-customer-editorial-writers',
  imports: [
    NgForOf,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './customer-editorial-writers.component.html',
  styleUrl: './customer-editorial-writers.component.scss'
})
export class CustomerEditorialWritersComponent {
  private service: CustomerEditorialWritersService = inject(CustomerEditorialWritersService);
  writers: EditorialWritersResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }
}
