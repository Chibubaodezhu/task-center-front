import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  form = new FormGroup({
    userName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    repeatPassword: new FormControl(null, [Validators.required]),
    verificationCode: new FormControl(null, Validators.required)
  }, []);
  loading = false;
  verificationButtonText = '获取验证码';
  verificationCountDown;
  verificationInterval;
  constructor() { }

  ngOnInit(): void {
  }

  getVerificationCode() {
    this.verificationCountDown = 60;
    this.verificationInterval = setInterval(() => {
      if (this.verificationCountDown != 0) {
        this.verificationButtonText = this.verificationCountDown + ' 秒后重发';
        this.verificationCountDown--;
      } else {
        this.verificationButtonText = '获取验证码';
        clearInterval(this.verificationInterval);
      }
    }, 1000);
  }

  modifyPassword() {

  }
}
