import { Route } from '@angular/router';
import { HomeComponent } from '../../../../pages/home/home.component';
import {LiteratureComponent} from '../../../../pages/literature/literature.component';
import {OrganizationsComponent} from '../../../../pages/organizations/organizations.component';
export class GuestChildrenRoutes {
  static children: Route[] = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'literature', component: LiteratureComponent, data: { title: 'Literature' } },
    { path: 'organizations', component: OrganizationsComponent, data: { title: 'Organizations' } },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
