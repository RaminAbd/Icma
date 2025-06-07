import {Component, inject} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {WorksResponseModel} from '../../../../admin-works/shared/models/works-response.model';
import {JobDetailsService} from './job-details.service';

@Component({
  selector: 'app-job-details',
    imports: [
        DatePipe,
        RouterLink,
        TranslatePipe
    ],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private service: JobDetailsService = inject(JobDetailsService);
  id = this.route.snapshot.paramMap.get('id') as string;
  response: WorksResponseModel = new WorksResponseModel();
  constructor() {
    this.service.component = this;
    this.service.getById()
  }
}
