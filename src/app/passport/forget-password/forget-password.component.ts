import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordRepeatValidator} from "../../common/validator/identity-revealed";
import {PassportService} from "../../common/service/passport.service";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    repeatPassword: new FormControl(null, [Validators.required]),
    verificationCode: new FormControl(null, Validators.required)
  }, [passwordRepeatValidator]);
  loading = false;
  verificationButtonText = '获取验证码';
  verificationCountDown;
  verificationInterval;
  constructor(
    private passportService: PassportService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getVerificationCode() {
    const formValue = this.form.value;
    if (!formValue || !formValue['email']) {
      this.message.warning('请先输入注册邮箱账号！');
      return;
    }
    const param = {
      email: formValue['email'],
      purpose: 'register'
    };
    this.passportService.getVerifyCode(param).subscribe(res => {
      if (res['success'] && res['data']) {
        this.message.success('验证码发送成功，请至邮箱查看！');
      } else {
        this.message.error(res['errorMsg']);
      }
    });
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
    if (this.beforeModify()) {
      let subscriber = this.passportService.forgetPassword(this.form.value).subscribe(res => {
        if (res && res['success']) {
          if (res['data']) {
            this.router.navigateByUrl('/passport/login');
          } else {
            this.message.warning('重置密码失败，请稍后重试！');
          }
        } else {
          this.message.error(res['errorMsg']);
        }
      });
    } else {
      if (this.form.errors && this.form.errors['passwordRepeat']) {
        this.message.warning('两次输入的密码不一致');
      }
    }
  }

  beforeModify() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    return this.form.valid;
  }
}
