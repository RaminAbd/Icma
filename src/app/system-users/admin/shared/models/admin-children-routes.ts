import {Route} from '@angular/router';
import {AdminEditorialsComponent} from '../../../../pages/admin-editorials/admin-editorials.component';

export class AdminChildrenRoutes {
  static children: Route[] = [
    {
      path: 'editorials',
      component: AdminEditorialsComponent,
      data: { title: 'Editorials' },
    },
    { path: '', redirectTo: 'editorials', pathMatch: 'full' },
    { path: '**', redirectTo: 'editorials', pathMatch: 'full' },
  ];
}
