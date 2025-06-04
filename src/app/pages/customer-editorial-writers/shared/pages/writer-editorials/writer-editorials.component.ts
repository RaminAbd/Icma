import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {WriterEditorialsService} from './writer-editorials.service';
import {EditorialsResponseModel} from '../../../../admin-editorials/shared/models/editorials-response.model';
import {NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-writer-editorials',
  imports: [
    NgForOf,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './writer-editorials.component.html',
  styleUrl: './writer-editorials.component.scss'
})
export class WriterEditorialsComponent {
  private service: WriterEditorialsService = inject(WriterEditorialsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id') as string;
  editorials:EditorialsResponseModel[]=[]
  constructor() {
    this.service.component=this;
    this.service.getAll()
  }
}
