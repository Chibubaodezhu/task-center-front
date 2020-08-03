import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PersonalCenterComponent} from './personal-center/personal-center.component';
import {LayoutModule} from '../../layout/layout.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'personal-center', component: PersonalCenterComponent}
];

@NgModule({
  declarations: [DashboardComponent, PersonalCenterComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    LayoutModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
