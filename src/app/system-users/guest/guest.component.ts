import { Component } from '@angular/core';
import {GuestHeaderComponent} from './shared/components/guest-header/guest-header.component';
import {RouterOutlet} from '@angular/router';
import {GuestFooterComponent} from './shared/components/guest-footer/guest-footer.component';

@Component({
  selector: 'app-guest',
  imports: [
    GuestHeaderComponent,
    RouterOutlet,
    GuestFooterComponent
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {

}
