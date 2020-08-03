import {Component, OnInit} from '@angular/core';
import {PassportService} from '../../../common/service/passport.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(
    private passportService: PassportService
  ) { }

  ngOnInit(): void {
  }

  test() {
    this.passportService.test().subscribe(res => {
      console.log(res);
    })
  }
}
