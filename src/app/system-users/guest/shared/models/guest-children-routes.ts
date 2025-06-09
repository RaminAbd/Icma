import { Route } from '@angular/router';
import { HomeComponent } from '../../../../pages/home/home.component';
import { LiteratureComponent } from '../../../../pages/literature/literature.component';
import { OrganizationsComponent } from '../../../../pages/organizations/organizations.component';
import { ProgramsComponent } from '../../../../pages/programs/programs.component';
import { JobsComponent } from '../../../../pages/jobs/jobs.component';
import { CustomerEditorialWritersComponent } from '../../../../pages/customer-editorial-writers/customer-editorial-writers.component';
import { WriterEditorialsComponent } from '../../../../pages/customer-editorial-writers/shared/pages/writer-editorials/writer-editorials.component';
import { VideosComponent } from '../../../../pages/videos/videos.component';
import { CultureComponent } from '../../../../pages/culture/culture.component';
import { ProgramDetailsComponent } from '../../../../pages/programs/shared/pages/program-details/program-details.component';
import { JobDetailsComponent } from '../../../../pages/jobs/shared/pages/job-details/job-details.component';
import { CultureDetailsComponent } from '../../../../pages/culture/shared/pages/culture-details/culture-details.component';
import {
  EditorialDetailsComponent
} from '../../../../pages/customer-editorial-writers/shared/pages/editorial-details/editorial-details.component';
export class GuestChildrenRoutes {
  static children: Route[] = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    {
      path: 'literature',
      component: LiteratureComponent,
      data: { title: 'Literature' },
    },
    {
      path: 'organizations/:type',
      component: OrganizationsComponent,
      data: { title: 'Organizations' },
    },
    {
      path: 'programs',
      component: ProgramsComponent,
      data: { title: 'Programs' },
    },
    {
      path: 'programs/:id',
      component: ProgramDetailsComponent,
      data: { title: 'Programs' },
    },
    {
      path: 'culture',
      component: CultureComponent,
      data: { title: 'Culture' },
    },
    {
      path: 'culture/:id',
      component: CultureDetailsComponent,
      data: { title: 'Culture' },
    },
    { path: 'jobs', component: JobsComponent, data: { title: 'Jobs' } },
    {
      path: 'jobs/:id',
      component: JobDetailsComponent,
      data: { title: 'Jobs' },
    },
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
    {
      path: 'editorials/details/:id',
      component: EditorialDetailsComponent,
      data: { title: 'Editorial' },
    },
    { path: 'videos', component: VideosComponent, data: { title: 'Videos' } },

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: 'projects', pathMatch: 'full' },
  ];
}
