import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('../routes/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'demo',
    loadChildren: () => import('../routes/demo/demo.module').then(m => m.DemoModule)
  },
  {
    path: 'task',
    loadChildren: () => import('../routes/task/task.module').then(m => m.TaskModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes)
  ]
})
export class RoutesModule { }
