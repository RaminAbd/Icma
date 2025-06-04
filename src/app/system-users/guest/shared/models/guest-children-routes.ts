import { Route } from '@angular/router';
import { HomeComponent } from '../../../../pages/home/home.component';
import { LiteratureComponent } from '../../../../pages/literature/literature.component';
import { OrganizationsComponent } from '../../../../pages/organizations/organizations.component';
import { ProgramsComponent } from '../../../../pages/programs/programs.component';
import { JobsComponent } from '../../../../pages/jobs/jobs.component';
import { CustomerEditorialWritersComponent } from '../../../../pages/customer-editorial-writers/customer-editorial-writers.component';
import { WriterEditorialsComponent } from '../../../../pages/customer-editorial-writers/shared/pages/writer-editorials/writer-editorials.component';
import { VideosComponent } from '../../../../pages/videos/videos.component';
export class GuestChildrenRoutes {
  static children: Route[] = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    {
      path: 'literature',
      component: LiteratureComponent,
      data: { title: 'Literature' },
    },
    {
      path: 'organizations',
      component: OrganizationsComponent,
      data: { title: 'Organizations' },
    },
    {
      path: 'programs',
      component: ProgramsComponent,
      data: { title: 'Programs' },
    },
    { path: 'jobs', component: JobsComponent, data: { title: 'Jobs' } },
    {
      path: 'editorials',
      component: CustomerEditorialWritersComponent,
      data: { title: 'Editorials' },
    },
    {
      path: 'editorials/:id',
      component: WriterEditorialsComponent,
      data: { title: 'Editorials' },
    },
    { path: 'videos', component: VideosComponent, data: { title: 'Videos' } },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
