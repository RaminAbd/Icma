import { Route } from '@angular/router';
import { HomeComponent } from '../../../../pages/home/home.component';
import {LiteratureComponent} from '../../../../pages/literature/literature.component';
export class GuestChildrenRoutes {
  static children: Route[] = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'literature', component: LiteratureComponent, data: { title: 'Literature' } },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
