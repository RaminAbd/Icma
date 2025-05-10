import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-guest-footer',
  imports: [
    RouterLink,
    TranslatePipe,
    RouterLinkActive
  ],
  templateUrl: './guest-footer.component.html',
  styleUrl: './guest-footer.component.scss'
})
export class GuestFooterComponent {

}
