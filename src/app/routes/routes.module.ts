import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WatchComponent } from '../watch/watch.component';

const routes: Routes = [
  { path: '**', redirectTo: '/', pathMatch: 'full' },
  { path: '',  component: WatchComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutesModule { }
