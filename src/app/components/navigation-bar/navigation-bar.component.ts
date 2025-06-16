import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgForOf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, NgForOf],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  sections: any[] = [
    {
      name: 'Portal menu',
      links: [
        {
          name: 'Banners',
          url: 'admin/banners',
        },
        {
          name: 'Literature',
          url: 'admin/literature',
        },
        {
          name: 'Organizations',
          url: 'admin/organizations',
        },
        {
          name: 'Agencies',
          url: 'admin/agencies',
        },
        //         {
        //           name: 'Programs',
        //           url: 'admin/programs',
        //         },
        {
          name: 'Culture',
          url: 'admin/culture',
        },
        {
          name: 'Works',
          url: 'admin/works',
        },

        {
          name: 'Editorials',
          url: 'admin/editorials',
        },
        {
          name: 'Writers',
          url: 'admin/writers',
        },
        {
          name: 'Videos',
          url: 'admin/videos',
        },

        {
          name: 'Images',
          url: 'admin/images',
        },
      ],
    },
  ];
  constructor(
    private sanitizer: DomSanitizer,
    private signInService: AuthService,
    private router: Router
  ) {}

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  logout() {
    this.signInService.logout();
    this.router.navigate(['/']);
  }
}
