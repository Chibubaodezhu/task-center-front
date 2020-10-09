import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './component/calendar/calendar.component';
import {NzIconModule, NzToolTipModule} from "ng-zorro-antd";



@NgModule({
  declarations: [CalendarComponent],
    imports: [
        CommonModule,
        NzIconModule,
        NzToolTipModule
    ],
  exports: [
    CalendarComponent
  ]
})
export class ResourcesModule { }
