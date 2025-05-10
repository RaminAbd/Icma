import { Routes } from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {GuestChildrenRoutes} from './system-users/guest/shared/models/guest-children-routes';
import {MainPageGuard} from './core/guards/main-page.guard';
import {RoleGuard} from './core/guards/role.guard';
import {CodeByRoleName} from './core/role-handlers/CodeByRoleName';
import {AdminChildrenRoutes} from './system-users/admin/shared/models/admin-children-routes';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    loadComponent: () =>
      import('./system-users/guest/guest.component').then(
        (m) => m.GuestComponent,
      ),
    children: GuestChildrenRoutes.children,
  },
  {
    path: 'main',
    canActivate: [MainPageGuard],
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    children: [
      {
        path: 'admin',
        loadComponent: () =>
          import('./system-users/admin/admin.component').then(
            (m) => m.AdminComponent,
          ),
        canActivate: [RoleGuard],
        data: { permissionTypes: CodeByRoleName['admin'] },
        children: AdminChildrenRoutes.children,
      },
      // { path: '**', redirectTo: 'admin', pathMatch: 'full' },
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
    ],
  },
  { path: 'admin', redirectTo: 'main/admin', pathMatch: 'full' },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];
