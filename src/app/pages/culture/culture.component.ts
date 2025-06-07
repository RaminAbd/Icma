import {Component, inject} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {ProgramsService} from '../programs/programs.service';
import {ProgramsResponseModel} from '../admin-programs/shared/models/programs-response.model';
import {CultureService} from './culture.service';
import {CultureResponseModel} from '../admin-culture/shared/models/culture-response.model';

@Component({
  selector: 'app-culture',
    imports: [
        DatePipe,
        NgForOf
    ],
  templateUrl: './culture.component.html',
  styleUrl: './culture.component.scss'
})
export class CultureComponent {
  private service: CultureService = inject(CultureService);
  culture: CultureResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }
}
