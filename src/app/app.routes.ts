import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login.component').then(m => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [AuthGuard], // Protege toda la ruta padre
    children: [
      {
        path: 'inventario',
        loadComponent: () =>
          import('./inventory/inventory.component').then(m => m.InventoryComponent),
      },
      {
        path: 'salida',
        loadComponent: () =>
          import('./output/output.component').then(m => m.OutputComponent),
      },
      {
        path: 'historial',
        loadComponent: () =>
          import('./history/history.component').then(m => m.HistoryComponent),
      },
      {
        path: '',
        redirectTo: 'inventario',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];