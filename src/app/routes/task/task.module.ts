import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application/application.component';
import { BoardComponent } from './board/board.component';
import {NzIconModule} from "ng-zorro-antd";
import {RouterModule, Routes} from "@angular/router";
import {LayoutModule} from "../../layout/layout.module";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'application' },
  { path: 'application', component: ApplicationComponent }
];

@NgModule({
  declarations: [ApplicationComponent, BoardComponent],
    imports: [
      CommonModule,
      NzIconModule,
      RouterModule,
      RouterModule.forChild(routes),
      LayoutModule
    ]
})
export class TaskModule { }
