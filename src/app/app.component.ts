import {Component, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {NgClass} from '@angular/common';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Title} from '@angular/platform-browser';
import {AppTranslateService} from './core/services/app-translate.service';
import {filter, map, mergeMap} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, NgClass, ConfirmDialog],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private titleService: Title = inject(Title);
  private appTranslate: AppTranslateService = inject(AppTranslateService);

  constructor() {
    this.appTranslate.registerLanguages();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        const title = data['title'] || 'Icma';
        this.titleService.setTitle(title);
      });
  }
}
