import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MemesDetailsComponent } from '../memes/memes-details/memes-details.component';

export const appRoutes: Routes = [

  { path: 'home',
  component: HomeComponent,
  pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'mem-details/:id',
    component: MemesDetailsComponent
  }
];
