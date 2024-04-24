import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/list-news/list-news.component').then(
        (x) => x.ListNewsComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
