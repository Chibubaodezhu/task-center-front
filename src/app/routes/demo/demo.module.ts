import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Demo1Component } from './demo1/demo1.component';
import {RouterModule, Routes} from "@angular/router";
import {LayoutModule} from "../../layout/layout.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ResourcesModule} from "../../resources/resources.module";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'demo1' },
  { path: 'demo1', component: Demo1Component }
];

@NgModule({
  declarations: [Demo1Component],
  imports: [
    CommonModule,
    ResourcesModule,
    RouterModule,
    RouterModule.forChild(routes),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DemoModule { }
