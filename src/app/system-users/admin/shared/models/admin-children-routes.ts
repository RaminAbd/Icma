import {Route} from '@angular/router';
import {AdminEditorialsComponent} from '../../../../pages/admin-editorials/admin-editorials.component';
import {GalleryPhotosComponent} from '../../../../pages/gallery-photos/gallery-photos.component';
import {GalleryVideosComponent} from '../../../../pages/gallery-videos/gallery-videos.component';
import {AdminOrganizationsComponent} from '../../../../pages/admin-organizations/admin-organizations.component';
import {AdminProgramsComponent} from '../../../../pages/admin-programs/admin-programs.component';
import {AdminWorksComponent} from '../../../../pages/admin-works/admin-works.component';
import {AdminFilesComponent} from '../../../../pages/admin-files/admin-files.component';
import {EditorialWritersComponent} from '../../../../pages/editorial-writers/editorial-writers.component';

export class AdminChildrenRoutes {
  static children: Route[] = [
    {
      path: 'editorials',
      component: AdminEditorialsComponent,
      data: { title: 'Editorials' },
    },
    {
      path: 'writers',
      component: EditorialWritersComponent,
      data: { title: 'Writers' },
    },
    {
      path: 'images',
      component: GalleryPhotosComponent,
      data: { title: 'Images' },
    },
    {
      path: 'videos',
      component: GalleryVideosComponent,
      data: { title: 'Videos' },
    },
    {
      path: 'organizations',
      component: AdminOrganizationsComponent,
      data: { title: 'Organizations' },
    },
    {
      path: 'programs',
      component: AdminProgramsComponent,
      data: { title: 'Programs' },
    },
    {
      path: 'works',
      component: AdminWorksComponent,
      data: { title: 'Works' },
    },
    {
      path: 'literature',
      component: AdminFilesComponent,
      data: { title: 'Literature' },
    },
    { path: '', redirectTo: 'editorials', pathMatch: 'full' },
    { path: '**', redirectTo: 'editorials', pathMatch: 'full' },
  ];
}
