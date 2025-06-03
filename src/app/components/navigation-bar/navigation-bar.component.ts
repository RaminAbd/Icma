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
          name: 'Literature',
          url: 'admin/literature',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8H2V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H16V20H4V8Z" fill="white"/>
<path d="M20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2ZM11 14V6L18 10L11 14Z" fill="white"/>
</svg>

`,
        },
        {
          name: 'Organizations',
          url: 'admin/organizations',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8H2V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H16V20H4V8Z" fill="white"/>
<path d="M20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2ZM11 14V6L18 10L11 14Z" fill="white"/>
</svg>

`,
        },
        {
          name: 'Programs',
          url: 'admin/programs',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8H2V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H16V20H4V8Z" fill="white"/>
<path d="M20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2ZM11 14V6L18 10L11 14Z" fill="white"/>
</svg>

`,
        },

        {
          name: 'Videos',
          url: 'admin/videos',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8H2V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H16V20H4V8Z" fill="white"/>
<path d="M20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2ZM11 14V6L18 10L11 14Z" fill="white"/>
</svg>

`,
        },

        {
          name: 'Images',
          url: 'admin/images',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 16V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16ZM11 12L13.03 14.71L16 11L20 16H8M2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18V20H4V6" fill="white"/>
</svg>

`,
        },

        {
          name: 'Editorials',
          url: 'admin/editorials',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9691 0.969C16.0388 0.899155 16.1215 0.843741 16.2127 0.805931C16.3038 0.768121 16.4015 0.748659 16.5001 0.748659C16.5988 0.748659 16.6964 0.768121 16.7876 0.805931C16.8787 0.843741 16.9614 0.899155 17.0311 0.969L23.0311 6.969C23.1009 7.03867 23.1564 7.12143 23.1942 7.21255C23.232 7.30367 23.2514 7.40135 23.2514 7.5C23.2514 7.59865 23.232 7.69633 23.1942 7.78745C23.1564 7.87857 23.1009 7.96133 23.0311 8.031L20.1781 10.884L18.9346 15.8535C18.84 16.2319 18.6487 16.5792 18.3795 16.8614C18.1102 17.1435 17.7722 17.3509 17.3986 17.463L1.8811 22.119L6.5371 6.6C6.64933 6.22689 6.85652 5.88932 7.13839 5.62033C7.42026 5.35134 7.76715 5.16016 8.1451 5.0655L13.1146 3.8235L15.9691 0.969ZM13.2691 5.331L8.5096 6.5205C8.38326 6.55203 8.26731 6.61592 8.17315 6.70587C8.07899 6.79582 8.00988 6.90873 7.9726 7.0335L4.1176 19.881L16.9681 16.026C17.0921 15.9884 17.2043 15.9193 17.2937 15.8255C17.3831 15.7316 17.4466 15.6162 17.4781 15.4905L18.6691 10.7295L13.2691 5.331Z" fill="#FEFFFD"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.24814 19.842L12.0001 13.5C12.2968 13.5 12.5868 13.412 12.8335 13.2472C13.0802 13.0824 13.2724 12.8481 13.386 12.574C13.4995 12.2999 13.5292 11.9983 13.4713 11.7074C13.4134 11.4164 13.2706 11.1491 13.0608 10.9393C12.851 10.7296 12.5837 10.5867 12.2928 10.5288C12.0018 10.4709 11.7002 10.5006 11.4261 10.6142C11.152 10.7277 10.9178 10.92 10.7529 11.1666C10.5881 11.4133 10.5001 11.7033 10.5001 12L4.15814 19.752L4.11914 19.881L4.24814 19.842Z" fill="#FEFFFD"/>
</svg>
`,
        },


        {
          name: 'Works',
          url: 'admin/works',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8H2V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H16V20H4V8Z" fill="white"/>
<path d="M20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2ZM11 14V6L18 10L11 14Z" fill="white"/>
</svg>

`,
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
