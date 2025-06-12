import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CultureDetailsService} from './culture-details.service';
import {CultureResponseModel} from '../../../../admin-culture/shared/models/culture-response.model';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-culture-details',
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './culture-details.component.html',
  styleUrl: './culture-details.component.scss'
})
export class CultureDetailsComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private service: CultureDetailsService = inject(CultureDetailsService);
  id = this.route.snapshot.paramMap.get('id') as string;
  response:CultureResponseModel = new CultureResponseModel();
  constructor() {
    this.service.component = this;
    this.service.getById()
  }
}
