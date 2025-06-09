import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
// import { ShareButtons } from 'ngx-sharebuttons/buttons';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { NewslettersService } from '../../../../../core/services/newsletters.service';
import { Subscription } from 'rxjs';
import { EditorialsResponseModel } from '../../../../admin-editorials/shared/models/editorials-response.model';
import { EditorialDetailsService } from './editorial-details.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-editorial-details',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    // ShareButtons,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './editorial-details.component.html',
  styleUrl: './editorial-details.component.scss',
  standalone:true,
})
export class EditorialDetailsComponent implements OnDestroy {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private service: EditorialDetailsService = inject(EditorialDetailsService);
  private newsLetterService: NewslettersService = inject(NewslettersService);
  private fb: FormBuilder = inject(FormBuilder);
  id = this.route.snapshot.paramMap.get('id') as string;
  response: EditorialsResponseModel = new EditorialsResponseModel();
  private routeSub!: Subscription;
  email: string;
  isSubmitted: boolean = false;
  requestForm = this.fb.group({
    email: [
      { value: '' },
      [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)],
    ],
  });
   constructor() {
    this.service.component = this;
    this.service.getById();
    this.routeSub = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
      this.service.getById();
    });
  }

  subscribe() {
    this.isSubmitted = true;
    if (this.requestForm.valid) {
      this.newsLetterService.subscribe(this.email, () => {
        this.email = '';
        this.isSubmitted = false;
        this.requestForm.reset();
      });
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
