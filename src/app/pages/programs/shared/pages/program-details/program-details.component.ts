import { Component, inject } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProgramsResponseModel } from '../../../../admin-programs/shared/models/programs-response.model';
import { ProgramDetailsService } from './program-details.service';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-program-details',
  imports: [
    DatePipe,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.scss',
})
export class ProgramDetailsComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private service: ProgramDetailsService = inject(ProgramDetailsService);
  id = this.route.snapshot.paramMap.get('id') as string;
  response: ProgramsResponseModel = new ProgramsResponseModel();
  constructor() {
    this.service.component = this;
    this.service.getById()
  }
}
