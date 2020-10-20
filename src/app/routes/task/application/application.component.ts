import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  pinState = false;
  boardList = [];
  constructor() { }

  ngOnInit(): void {
  }

  pin(target: HTMLElement, target2: HTMLElement) {
    if (this.pinState) {
      target.classList.add('first-level-control-pinned');
      target.classList.remove('first-level-control-unpinned');
      target2.classList.add('is-expanded', 'is-pinned');
    } else {
      target.classList.add('first-level-control-unpinned');
      target.classList.remove('first-level-control-pinned');
      target2.classList.remove('is-expanded', 'is-pinned');
    }
    this.pinState = !this.pinState;
  }

  searchBoardInputClick(target: HTMLElement) {
    target.classList.add('focused');
  }

  searchBoardInputBlur(target: HTMLElement) {
    target.classList.remove('focused');
  }
}
