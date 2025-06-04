import { Component, inject } from '@angular/core';
import { WorksResponseModel } from '../admin-works/shared/models/works-response.model';
import { JobsService } from './jobs.service';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-jobs',
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  private service: JobsService = inject(JobsService);
  works: WorksResponseModel[] = [];

  constructor() {
    this.service.component = this;
    this.service.getAll();
  }

}
