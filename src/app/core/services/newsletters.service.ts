import { inject, Injectable } from '@angular/core';
import { NewslettersApiService } from './newsletters.api.service';
import { ApplicationMessageCenterService } from './ApplicationMessageCenter.service';

@Injectable({
  providedIn: 'root',
})
export class NewslettersService {
  private service: NewslettersApiService = inject(NewslettersApiService);
  private message: ApplicationMessageCenterService = inject(
    ApplicationMessageCenterService
  );
  constructor() {}

  subscribe(email: string, callBack: any) {
    const req = {
      email: email,
    };
    this.service.Subscribe(req).subscribe((resp) => {
      if (resp.succeeded) {
        this.message.showSuccessMessage('Success', 'Subscribed Successfully.');
        callBack();
      }
    });
  }
}
