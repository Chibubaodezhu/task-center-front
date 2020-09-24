import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PassportService} from '../../common/service/passport.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NzMessageService]
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    remember: new FormControl(false)
  });
  loading = false;
  constructor(
    private passportService: PassportService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const loginInfo = localStorage.getItem('loginInfo');
    if (loginInfo) {
      this.form.patchValue(JSON.parse(loginInfo));
    }
  }

  login() {
    this.loading = true;
    if (this.beforeLogin()) {
      this.passportService.login(this.form.value).subscribe(res => {
        if (res) {
          if (res['success']) {
            if (this.form.value['remember']) {
              localStorage.setItem('loginInfo', JSON.stringify(this.form.value));
            } else {
              localStorage.setItem('loginInfo', '{}');
            }
            localStorage.setItem('userId', this.form.value['username']);
            this.router.navigate(['/routes/home/dashboard']);
          } else {
            this.message.error(res['errorMsg']);
          }
        } else {
          this.loading = false;
          this.message.error('服务器异常，请稍后再试');
        }
      });
    }
  }

  beforeLogin(): boolean {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    return this.form.valid;
  }
}
