import { Component, OnInit } from '@angular/core';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {

  pageHeight = window.innerHeight;
  pageWidth = window.innerWidth;
  year;
  constructor() { }

  ngOnInit(): void {
    const date = new Date();
    this.year = date.getFullYear();
    fromEvent(window, 'resize').subscribe(() => {
      this.pageWidth = window.innerWidth;
      this.pageHeight = window.innerHeight;
    });
  }

}
