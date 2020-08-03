import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {RegisterComponent} from './register/register.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'forget-password', component: ForgetPasswordComponent}
];

@NgModule({
  declarations: [LoginComponent, ForgetPasswordComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class PassportModule { }
