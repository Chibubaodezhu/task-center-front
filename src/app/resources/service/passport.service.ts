import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  urlPre = environment.urlPre + '/task-center/';

  constructor(
    private httpClient: HttpClient
  ) { }

  register(param) {
    const url = this.urlPre + 'passport/register';
    return this.httpClient.post(url, param);
  }

  forgetPassword(param) {
    const url = this.urlPre + 'passport/forget_password';
    return this.httpClient.post(url, param);
  }

  getVerifyCode(param) {
    const url = this.urlPre + 'passport/get_verify_code';
    return this.httpClient.get(url, {params: param});
  }

  login(param) {
    const url = this.urlPre + 'login';
    return this.httpClient.post(url, null, {params: param});
  }

  test() {
    const url = this.urlPre + 'test/set_session';
    return this.httpClient.get(url, {});
  }
}

