import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'passport'},
  {
    path: 'passport',
    loadChildren: () => import('./passport/passport.module').then( m => m.PassportModule)
  },
  {
    path: 'routes',
    component: LayoutComponent,
    loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
