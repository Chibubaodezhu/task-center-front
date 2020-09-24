import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  urlPre = environment.urlPre + '/task-center/';

  constructor(
    private httpClient: HttpClient
  ) { }
}
