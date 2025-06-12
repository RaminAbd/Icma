import { Component, inject } from '@angular/core';
import { ProgramsResponseModel } from '../admin-programs/shared/models/programs-response.model';
import { ProgramsService } from './programs.service';
import {DatePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-programs',
  imports: [
    NgForOf,
    DatePipe,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent {
  private service: ProgramsService = inject(ProgramsService);
  programs: ProgramsResponseModel[] = [];
  constructor() {
    this.service.component = this;
    this.service.getAll();
  }
}
