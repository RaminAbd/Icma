import { Route } from '@angular/router';
import { HomeComponent } from '../../../../pages/home/home.component';
export class GuestChildrenRoutes {
  static children: Route[] = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
